const fs = require('fs');

/**
 * @returns {string[]} - array of all base food and potion names that we need with tiers
 */
function getAllFoodAndPotionNames() {
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

    if (namesOrChildrens.every((item) => typeof item === 'string')) {
      itemNames.push(...namesOrChildrens);
    } else {
      getItemNamesFromTree(namesOrChildrens);
    }
  });

  getItemNamesFromTree(tree);

  return itemNames;
}

module.exports = {
  getAllFoodAndPotionNames
}