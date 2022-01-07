const axios = require('axios');
const fs = require('fs');
const { getAllFoodAndPotionNames } = require('./utils');

/**
 * Get data from albion online dumps repository
 */
async function getItems() {
  console.log('Downloading items dump...');

  try {
    const request = await axios.get('https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json');
    
    console.log('Dump downloaded');

    return request.data;
  } catch {
    console.log('Something went wrong while downloading');

    return [];
  }  
}

async function main() {
  const itemNames = getAllFoodAndPotionNames();
  const dump = (await getItems())?.items?.consumableitem;

  const filteredItems = dump.filter((item) => itemNames.includes(item["@uniquename"]));

  fs.writeFileSync("./static/jsonAutomatic/foodAndPotionsTreeItems.json", JSON.stringify(filteredItems));
}

main();