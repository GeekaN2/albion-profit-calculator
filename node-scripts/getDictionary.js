const axios = require('axios');
const fs = require('fs');

/**
 * Get data from albion online dumps repository
 */
async function getItems() {
  console.log('Downloading items dump...');

  const request = await axios.get('https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/formatted/items.json');
  
  console.log('Dump downloaded');

  return request.data;
}

/**
 * @returns {string[]} - array of all item names that we need without a tier and subtier
 */
function getAllNames() {
  let recipes = fs.readFileSync('./static/json/profitTreeRecipes.json');
  recipes = JSON.parse(recipes);

  const baseItemNames = Object.keys(recipes).map(item => item.slice(3))
  .concat(['PLANKS', 'METALBAR', 'LEATHER', 'CLOTH', 'STONEBLOCK', 'FIBER', 'ROCK', 'ORE', 'WOOD', 'HIDE'])
  .concat(['JOURNAL_WARRIOR', 'JOURNAL_HUNTER', 'JOURNAL_TOOLMAKER', 'JOURNAL_MAGE'])
  .concat(['SKILLBOOK_STANDARD', 'QUESTITEM_TOKEN_ROYAL', '_TOKEN_1', '_CAPEITEM_FW_']);

  return baseItemNames;
}

/**
 * Does the string contain at least one substring of this array
 * 
 * @param {string[]} arr
 * @param {string} str 
 */
function isStringInArray(arr, str) {
  return arr.some(substring => str.includes(substring));
}

async function main(){
  const itemNames = getAllNames();
  const dump = await getItems();

  /**
   * {
   *   "RU-RU": { 
   *     "ITEM_NAME": "Name in Russian"
   *   },
   *   "EN-US": {
   *     "ITEM_NAME": "Name in English"
   *   }
   * }
   */
  let dictionary = {
    'ru': {},
    'en': {}
  };

  dump.forEach(item => {
    try {
      if (isStringInArray(itemNames, item.UniqueName)) {
        dictionary['ru'][item.UniqueName] = item.LocalizedNames['RU-RU'];
        dictionary['en'][item.UniqueName] = item.LocalizedNames['EN-US'];
      }
    } catch {
      console.log('Bruh item', item.UniqueName);
    }
  })

  fs.writeFileSync("./locales/automaticRu.json", JSON.stringify(dictionary['ru']));
  fs.writeFileSync("./locales/automaticEn.json", JSON.stringify(dictionary['en']));
  // console.log(dictionary);
}

main();