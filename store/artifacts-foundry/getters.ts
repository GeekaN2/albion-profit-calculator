import { GetterTree } from 'vuex'
import { generateTiers } from '../utils';
import { ArtifactsFoundryState, ArtifactsTreeForCurrentFragment } from './typeDefs';

export const getters: GetterTree<ArtifactsFoundryState, {}> = {

  getArtifactsNeeded: (state): ArtifactsTreeForCurrentFragment => {
    const { WARRIOR_BRANCH, HUNTER_BRANCH, MAGE_BRANCH } = state.tree;
    const currentFragmentType = state.currentItemInfo.name;
    const getArtifactsWithTiers = (baseArtifactNames: string[]) => baseArtifactNames.reduce<string[]>((acc, baseName) => [...acc, ...generateTiers('ARTEFACT_' + baseName.slice(3))], [])

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