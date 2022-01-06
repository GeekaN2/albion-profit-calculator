const axios = require('axios');
const fs = require('fs');

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

/**
 * @returns {string[]} - array of all item names that we need with tiers
 */
function getAllNames() {
  const treeJson = fs.readFileSync('./static/json/foodAndPotionsTree.json');
  const tree = JSON.parse(treeJson);

  const getBranchOrNames = (branchItem) => {
    if ('tiers' in branchItem) {
      return branchItem.tiers;
    }

    if ('children' in branchItem) {
      return branchItem.children;
    }

    return [];
  }

  let itemNames = [];

  const getItemNamesFromTree = (treeBranch) => treeBranch.map((treeBranch) => {
    let namesOrChildrens = getBranchOrNames(treeBranch);
    
    if (namesOrChildrens.every(item => typeof item === 'string')) {
      itemNames.push(...namesOrChildrens);
    } else {
      getItemNamesFromTree(namesOrChildrens);
    }
  });

  getItemNamesFromTree(tree);

  return itemNames;
}

async function main() {
  const itemNames = getAllNames();
  const dump = (await getItems())?.items?.consumableitem;

  const filteredItems = dump.filter((item) => itemNames.includes(item["@uniquename"]));

  fs.writeFileSync("./static/jsonAutomatic/foodAndPotionsTree.json", JSON.stringify(filteredItems));
}

main();