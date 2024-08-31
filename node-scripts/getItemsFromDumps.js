const axios = require('axios');
const fs = require('fs');
const { getAllFoodAndPotionNames, getItems } = require('./utils');

async function main() {
  const itemNames = getAllFoodAndPotionNames();
  let dump = (await getItems());
  dump = dump.items.consumableitem.concat(dump.items.simpleitem);

  const filteredItems = dump.filter((item) => itemNames.includes(item["@uniquename"]));

  try {
    fs.writeFileSync("./static/jsonAutomatic/foodAndPotionsTreeItems.json", JSON.stringify(filteredItems));

    itemNames.forEach(itemName => console.log('Added', itemName));
  } catch (error) {
    console.log('Writing aborted', error);
  }

}

main();
