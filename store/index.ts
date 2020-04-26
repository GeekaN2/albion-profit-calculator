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
          children: [{  
            name: 'T4_SHOES_PLATE_SET1',
            children: [{
              name: 'T4_SHOES_PLATE_SET1',
            }, {
              name: 'T4_SHOES_PLATE_SET2'
            }, {
              name: 'T4_SHOES_PLATE_SET3'
            }, {
              name: 'T4_SHOES_PLATE_UNDEAD'
            }, {
              name: 'T4_SHOES_PLATE_HELL'
            }, {
              name: 'T4_SHOES_PLATE_KEEPER'
            }, {
              name: 'T4_SHOES_PLATE_AVALON'
            }]
          }, {
            name: 'T4_ARMOR_PLATE_SET1',
            children: [{
              name: 'T4_ARMOR_PLATE_SET1',
            }, {
              name: 'T4_ARMOR_PLATE_SET2'
            }, {
              name: 'T4_ARMOR_PLATE_SET3'
            }, {
              name: 'T4_ARMOR_PLATE_UNDEAD'
            }, {
              name: 'T4_ARMOR_PLATE_HELL'
            }, {
              name: 'T4_ARMOR_PLATE_KEEPER'
            }, {
              name: 'T4_ARMOR_PLATE_AVALON'
            }]
          }, {
            name: 'T4_HEAD_PLATE_SET1',
            children: [{
              name: 'T4_HEAD_PLATE_SET1',
            }, {
              name: 'T4_HEAD_PLATE_SET2'
            }, {
              name: 'T4_HEAD_PLATE_SET3'
            }, {
              name: 'T4_HEAD_PLATE_UNDEAD'
            }, {
              name: 'T4_HEAD_PLATE_HELL'
            }, {
              name: 'T4_HEAD_PLATE_KEEPER'
            }, {
              name: 'T4_HEAD_PLATE_AVALON'
            }]
          }, {
            name: 'T4_MAIN_SWORD',
            children: [{
              name: 'T4_MAIN_SWORD',
            }, {
              name: 'T4_2H_CLAYMORE'
            }, {
              name: 'T4_2H_DUALSWORD'
            }, {
              name: 'T4_MAIN_SCIMITAR_MORGANA'
            }, {
              name: 'T4_2H_CLEAVER_HELL'
            }, {
              name: 'T4_2H_DUALSCIMITAR_UNDEAD'
            }]
          }, {
            name: 'T4_MAIN_AXE',
            children: [{
              name: 'T4_MAIN_AXE',
            }, {
              name: 'T4_2H_AXE'
            }, {
              name: 'T4_2H_HALBERD'
            }, {
              name: 'T4_2H_HALBERD_MORGANA'
            }, {
              name: 'T4_2H_SCYTHE_HELL'
            }, {
              name: 'T4_2H_DUALAXE_KEEPER'
            }]
          }, {
            name: 'T4_MAIN_MACE',
            children: [{
              name: 'T4_MAIN_MACE',
            }, {
              name: 'T4_2H_MACE'
            }, {
              name: 'T4_2H_FLAIL'
            }, {
              name: 'T4_MAIN_ROCKMACE_KEEPER'
            }, {
              name: 'T4_MAIN_MACE_HELL'
            }, {
              name: 'T4_2H_MACE_MORGANA'
            }]
          }, {
            name: 'T4_MAIN_HAMMER',
            children: [{
              name: 'T4_MAIN_HAMMER',
            }, {
              name: 'T4_2H_POLEHAMMER'
            }, {
              name: 'T4_2H_HAMMER'
            }, {
              name: 'T4_2H_HAMMER_UNDEAD'
            }, {
              name: 'T4_2H_DUALHAMMER_HELL'
            }, {
              name: 'T4_2H_RAM_KEEPER'
            }]
          }, {
            name: 'T4_2H_CROSSBOW',
            children: [{
              name: 'T4_2H_CROSSBOW',
            }, {
              name: 'T4_2H_CROSSBOWLARGE'
            }, {
              name: 'T4_MAIN_1HCROSSBOW'
            }, {
              name: 'T4_2H_REPEATINGCROSSBOW_UNDEAD'
            }, {
              name: 'T4_2H_DUALCROSSBOW_HELL'
            }, {
              name: 'T4_2H_CROSSBOWLARGE_MORGANA'
            }]
          }, {
            name: 'T4_OFF_SHIELD',
            children: [{
              name: 'T4_OFF_SHIELD',
            }, {
              name: 'T4_OFF_TOWERSHIELD_UNDEAD'
            }, {
              name: 'T4_OFF_SHIELD_HELL'
            }, {
              name: 'T4_OFF_SPIKEDSHIELD_MORGANA'
            }]
          }]
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
            children: [{
              name: 'T4_SHOES_CLOTH_SET1'
            }, {
              name: 'T4_SHOES_CLOTH_SET2'
            }, {
              name: 'T4_SHOES_CLOTH_SET3'
            }, {
              name: 'T4_SHOES_CLOTH_KEEPER'
            }, {
              name: 'T4_SHOES_CLOTH_HELL'
            }, {
              name: 'T4_SHOES_CLOTH_MORGANA'
            }, {
              name: 'T4_SHOES_CLOTH_AVALON'
            }],
          }, {
            name: 'T4_ARMOR_CLOTH_SET1',
            children: [{
              name: 'T4_ARMOR_CLOTH_SET1'
            }, {
              name: 'T4_ARMOR_CLOTH_SET2'
            }, {
              name: 'T4_ARMOR_CLOTH_SET3'
            }, {
              name: 'T4_ARMOR_CLOTH_KEEPER'
            }, {
              name: 'T4_ARMOR_CLOTH_HELL'
            }, {
              name: 'T4_ARMOR_CLOTH_MORGANA'
            }, {
              name: 'T4_ARMOR_CLOTH_AVALON'
            }],
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
            children: [{
              name: 'T4_MAIN_FIRESTAFF',
            }, {
              name: 'T4_2H_FIRESTAFF',
            }, {
              name: 'T4_2H_INFERNOSTAFF',
            }, {
              name: 'T4_MAIN_FIRESTAFF_KEEPER',
            }, {
              name: 'T4_2H_FIRESTAFF_HELL',
            }, {
              name: 'T4_2H_INFERNOSTAFF_MORGANA',
            }, ],
          }, {
            name: 'T4_MAIN_HOLYSTAFF',
            children: [{
              name: 'T4_MAIN_HOLYSTAFF'
            }, {
              name: 'T4_2H_HOLYSTAFF'
            }, {
              name: 'T4_2H_DIVINESTAFF'
            }, {
              name: 'T4_MAIN_HOLYSTAFF_MORGANA'
            }, {
              name: 'T4_2H_HOLYSTAFF_HELL'
            }, {
              name: 'T4_2H_HOLYSTAFF_UNDEAD'
            }],
          }, {
            name: 'T4_MAIN_ARCANESTAFF',
            children: [{
              name: 'T4_MAIN_ARCANESTAFF'
            }, {
              name: 'T4_2H_ARCANESTAFF'
            }, {
              name: 'T4_2H_ENIGMATICSTAFF'
            }, {
              name: 'T4_MAIN_ARCANESTAFF_UNDEAD'
            }, {
              name: 'T4_2H_ARCANESTAFF_HELL'
            }, {
              name: 'T4_2H_ENIGMATICORB_MORGANA'
            }],
          }, {
            name: 'T4_MAIN_FROSTSTAFF',
            children: [{
              name: 'T4_MAIN_FROSTSTAFF'
            }, {
              name: 'T4_2H_FROSTSTAFF'
            }, {
              name: 'T4_2H_GLACIALSTAFF'
            }, {
              name: 'T4_MAIN_FROSTSTAFF_KEEPER'
            }, {
              name: 'T4_2H_ICEGAUNTLETS_HELL'
            }, {
              name: 'T4_2H_ICECRYSTAL_UNDEAD'
            }],
          }, {
            name: 'T4_MAIN_CURSEDSTAFF',
            children: [{
              name: 'T4_MAIN_CURSEDSTAFF'
            }, {
              name: 'T4_2H_CURSEDSTAFF'
            }, {
              name: 'T4_2H_DEMONICSTAFF'
            }, {
              name: 'T4_MAIN_CURSEDSTAFF_UNDEAD'
            }, {
              name: 'T4_2H_SKULLORB_HELL'
            }, {
              name: 'T4_2H_CURSEDSTAFF_MORGANA'
            }],
          }, {
            name: 'T4_OFF_BOOK',
            children: [{
              name: 'T4_OFF_BOOK'
            }, {
              name: 'T4_OFF_ORB_MORGANA'
            }, {
              name: 'T4_OFF_DEMONSKULL_HELL'
            }, {
              name: 'T4_OFF_TOTEM_KEEPER'
            }],
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