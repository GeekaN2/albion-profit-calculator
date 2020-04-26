import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    todos: [],
    tree: [{
      name: 'ROOT',
      children: [
        {
          name: 'ROOT_BLACKSMITH',
          children: []
        }, {
          name: 'ROOT_HUNTER',
          children: [{
            name: 'T4_SHOES_CLOTH_SET1',
            children: [],
          }]
        }, {
          name: 'ROOT_MAGE',
          children: [{
            name: 'T4_SHOES_CLOTH_SET1',
            children: [],
          }, {
            name: 'T4_ARMOR_CLOTH_SET1',
            children: [],
          }, {
            name: 'T4_HEAD_CLOTH_SET1',
            children: [{
              name: 'T4_HEAD_CLOTH_SET1'
            }, {
              name: 'T4_HEAD_CLOTH_SET2'
            }, {
              name: 'T4_HEAD_CLOTH_SET3'
            }, {
              name: 'T4_HEAD_CLOTH_KEEPER'
            }, {
              name: 'T4_HEAD_CLOTH_HELL'
            }, {
              name: 'T4_HEAD_CLOTH_MORGANA'
            }, {
              name: 'T4_HEAD_CLOTH_AVALON'
            }],
          }, {
            name: 'T4_MAIN_FIRESTAFF',
            children: [],
          }, {
            name: 'T4_MAIN_HOLYSTAFF',
            children: [],
          }, {
            name: 'T4_MAIN_ARCANESTAFF',
            children: [],
          }, {
            name: 'T4_MAIN_FROSTSTAFF',
            children: [],
          }, {
            name: 'T4_MAIN_CURSEDSTAFF',
            children: [],
          }, {
            name: 'T4_OFF_BOOK',
            children: [],
          }]
        }, {
          name: 'ROOT_LOCKSMITH',
          children: []
        }
      ],
    }]
  }
});

export default store;