import { GetterTree } from 'vuex'
import { ResponseModel } from '../typeDefs';
import { generateTiers } from '../utils';
import { ArtifactBranchType, ArtifactFoundryState, ArtifactsTreeForCurrentFragment } from './typeDefs';
import { MARKET_SELL_ORDER_FEE } from '../constants';

export const getters: GetterTree<ArtifactFoundryState, {}> = {

  getArtifactsNeeded: (state): ArtifactsTreeForCurrentFragment => {
    const { WARRIOR_BRANCH, HUNTER_BRANCH, MAGE_BRANCH } = state.tree;
    const currentFragmentType = state.currentFragmentType.name ?? 'RUNE';

    const getArtifactsWithTiers = (baseArtifactNames: string[]) => baseArtifactNames.reduce<string[]>((acc, baseName) => [...acc, ...generateTiers(baseName)], [])

    return {
        'WARRIOR_BRANCH': getArtifactsWithTiers(WARRIOR_BRANCH[currentFragmentType]),
        'HUNTER_BRANCH': getArtifactsWithTiers(HUNTER_BRANCH[currentFragmentType]),
        'MAGE_BRANCH': getArtifactsWithTiers(MAGE_BRANCH[currentFragmentType]),
    };
  },

  getFragmentsNeeded: (state): string[] => {
    const fragments = state.currentFragmentType.name;

    if (!fragments) {
        return [];
    }

    return generateTiers(fragments);
  },

  getAllBaseArtifactNames: (state): string[] => {
    const fragmentType = state.currentFragmentType.name;

    if (!fragmentType) {
      return [];
    }

    return Object.values(state.tree).map(branch => branch[fragmentType]).flat();
  },

  getFragmentsMeldProfit: (state, getters) => (branch: ArtifactBranchType | 'ALL', tier: number) => {
    const fragmentType = state.currentFragmentType.name;

    if (!fragmentType) {
      return;
    }

    const branchItems = branch === 'ALL' ? getters.getAllBaseArtifactNames as string[] : state.tree[branch][fragmentType];
    const sellArtifactItems: ResponseModel[] = getters.sellArtifacts;
    const buyFragmentItems: ResponseModel[] = getters.buyFragments;
    const filteredItems = sellArtifactItems
      .filter(artifact => artifact.itemId.slice(1, 2) === String(tier))
      .filter(artifact => branchItems.includes(artifact.itemId.slice(3)));

    const fragmentsPrice = buyFragmentItems.find(fragment => fragment.itemId.includes(`T${tier}`)); 

    if (!fragmentsPrice) {
      return;
    }

    const fragmentExpenses = fragmentsPrice.sellPriceMin * (branch === 'ALL' ? 36 : 50);
    
    const getItemProfit = (item: ResponseModel) => item.sellPriceMin * (100 - MARKET_SELL_ORDER_FEE) / 100 - fragmentExpenses;

    // We have a normal distribution, so we use these formulas
    const totalProfit = filteredItems.reduce((acc, item) => acc + getItemProfit(item), 0);
    const averageMean = totalProfit / filteredItems.length;
    const variance = filteredItems.reduce((acc, item) => acc + (getItemProfit(item) - averageMean) ** 2, 0) / filteredItems.length;
    const quadraticMean = Math.sqrt(variance);
    const medianItem = filteredItems[Math.floor(filteredItems.length / 2)];

    const averageProfitReal = averageMean;
    const averageProfitPercentage = averageMean / fragmentExpenses * 100;

    console.log(branch, averageMean, variance);

    return {
      branch,
      tier,
      profit: Math.floor(averageProfitReal),
      profitPercentage: averageProfitPercentage,
    }
  },

  getCellItems: (state, getters) => {
    if (!state.extendedCell || !state.currentFragmentType.name) {
      return;
    }

    const fragmentType = state.currentFragmentType.name;
    const { branch, tier } = state.extendedCell;

    const branchItems = branch === 'ALL' ? getters.getAllBaseArtifactNames as string[] : state.tree[branch][fragmentType];
    const sellArtifactItems: ResponseModel[] = getters.sellArtifacts;
    const buyFragmentItems: ResponseModel[] = getters.buyFragments;
    const filteredItems = sellArtifactItems
      .filter(artifact => artifact.itemId.slice(1, 2) === String(tier))
      .filter(artifact => branchItems.includes(artifact.itemId.slice(3)));

    const fragmentsPrice = buyFragmentItems.find(fragment => fragment.itemId.includes(`T${tier}`)); 

    if (!fragmentsPrice) {
      return;
    }

    const fragmentExpenses = fragmentsPrice.sellPriceMin * (branch === 'ALL' ? 36 : 50);
    
    const getItemProfit = (item: ResponseModel) => item.sellPriceMin * (100 - MARKET_SELL_ORDER_FEE) / 100 - fragmentExpenses;
    const getItemProfitPercentage = (item: ResponseModel) => getItemProfit(item) / fragmentExpenses * 100;

    // We have a normal distribution, so we use these formulas
    const totalProfit = filteredItems.reduce((acc, item) => acc + getItemProfit(item), 0);
    const averageMeanProfit = totalProfit / filteredItems.length;
    const variance = filteredItems.reduce((acc, item) => acc + (getItemProfit(item) - averageMeanProfit) ** 2, 0) / filteredItems.length;
    const quadraticMeanProfit = Math.sqrt(variance);
    
    const totalItemsPrice = filteredItems.reduce((acc, item) => acc + item.sellPriceMin, 0);
    const averageMeanPrice = totalItemsPrice / filteredItems.length;
    const averageMeanProfitPercentage = averageMeanProfit / fragmentExpenses * 100;

    const medianItem = filteredItems[Math.floor(filteredItems.length / 2)];
    const medianItemPrice = medianItem.sellPriceMin;
    const medianItemProfit = medianItemPrice - fragmentExpenses;
    const medianItemProfitPercentage = medianItemProfit / fragmentExpenses * 100;

    const artifactCellsData = filteredItems.map(artifact => ({
      item: artifact,
      profit: getItemProfit(artifact),
      profitPercentage: getItemProfitPercentage(artifact),
      expenses: fragmentExpenses,
    })).sort((art1, art2) => art2.profit - art1.profit);

    return {
      averageMeanProfit,
      averageMeanProfitPercentage,
      quadraticMeanProfit,
      variance,
      averageMeanPrice,
      medianItemPrice,
      medianItemProfit,
      medianItemProfitPercentage,

      items: artifactCellsData,

    }
  },

  buyFragments: (state) => {
    const currentFragmentType = state.currentFragmentType.name ?? '';
    const city = state.settings.cities.buyFragments;
    const fragments = state.fragments[city].filter(fragment => fragment.itemId.includes(currentFragmentType))

    return fragments;
  },

  sellFragments: (state) => {
    const currentFragmentType = state.currentFragmentType.name ?? '';
    const city = state.settings.cities.sellFragments;
    const fragments = state.fragments[city].filter(fragment => fragment.itemId.includes(currentFragmentType))

    return fragments;
  },

  buyArtifacts: (state, getters) => {
    const allArtifactNames: string[] = getters.getAllBaseArtifactNames;
    const city = state.settings.cities.buyArtifacts;
    const artifacts = state.artifacts[city].filter(({ itemId }) => allArtifactNames.includes(itemId.slice(3)));

    return artifacts;
  },

  sellArtifacts: (state, getters) => {
    const allArtifactNames: string[] = getters.getAllBaseArtifactNames;
    const city = state.settings.cities.sellArtifacts;
    const artifacts = state.artifacts[city].filter(({ itemId }) => allArtifactNames.includes(itemId.slice(3)));

    return artifacts;
  }

}