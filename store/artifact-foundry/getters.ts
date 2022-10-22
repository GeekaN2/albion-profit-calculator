import { GetterTree } from 'vuex'
import { ResponseModel } from '../typeDefs';
import { generateTiers } from '../utils';
import { ArtifactBranchType, ArtifactFoundryState, ArtifactsTreeForCurrentFragment } from './typeDefs';
import { MARKET_SELL_ORDER_FEE } from '../constants';

export const getters: GetterTree<ArtifactFoundryState, {}> = {

  getArtifactsNeeded: (state): ArtifactsTreeForCurrentFragment => {
    const { WARRIOR_BRANCH, HUNTER_BRANCH, MAGE_BRANCH } = state.tree;
    const currentFragmentType = state.currentItemInfo.name ?? 'RUNE';

    const getArtifactsWithTiers = (baseArtifactNames: string[]) => baseArtifactNames.reduce<string[]>((acc, baseName) => [...acc, ...generateTiers(baseName)], [])

    return {
        'WARRIOR_BRANCH': getArtifactsWithTiers(WARRIOR_BRANCH[currentFragmentType]),
        'HUNTER_BRANCH': getArtifactsWithTiers(HUNTER_BRANCH[currentFragmentType]),
        'MAGE_BRANCH': getArtifactsWithTiers(MAGE_BRANCH[currentFragmentType]),
    };
  },

  getFragmentsNeeded: (state): string[] => {
    const fragments = state.currentItemInfo.name;

    if (!fragments) {
        return [];
    }

    return generateTiers(fragments);
  },

  getFragmentsMeldProfit: (state, getters) => (branch: ArtifactBranchType | 'ALL', tier: number) => {
    const fragmentType = state.currentItemInfo.name;

    if (!fragmentType) {
      return;
    }

    const branchItems = branch === 'ALL' ? Object.values(state.tree).map(branch => branch[fragmentType]).flat() : state.tree[branch][fragmentType];
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

  buyFragments: (state) => {
    const city = state.settings.cities.buyFragments;

    return state.fragments[city];
  },

  sellFragments: (state) => {
    const city = state.settings.cities.sellFragments;

    return state.fragments[city];
  },

  buyArtifacts: (state) => {
    const city = state.settings.cities.buyArtifacts;

    return state.artifacts[city];
  },

  sellArtifacts: (state) => {
    const city = state.settings.cities.sellArtifacts;

    return state.artifacts[city];
  }

}