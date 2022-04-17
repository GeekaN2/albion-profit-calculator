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

/**
 * Creates an array with all names of full journals of all tiers and subtiers
 * 
 * @param {string} root - journals branch: WARRIOR, MAGE etc.
 * @returns {string[]} - array with all tiers and subtiers for empty and full journals
 */
function createArrayOfAllJournals(root) {
  let allNames = [];

  for (let tier = 4; tier <= 8; tier++) {
    allNames.push(`T${tier}_JOURNAL_${root}_EMPTY`);
    allNames.push(`T${tier}_JOURNAL_${root}_FULL`);
  }

  return allNames.slice(0, -1);
}

/**
 * Creates and array with all names of food, potions and relative items in their branches
 * 
 * @returns {string[]}
 */
function createArrayOfAllFoodAndPotions() {
  let allNames = [];
  let baseNames = getAllFoodAndPotionNames();
  let treeItems = fs.readFileSync('./static/jsonAutomatic/foodAndPotionsTreeItems.json');
  treeItems = JSON.parse(treeItems);

  // Push food and potions resources
  for (let item of treeItems) {
    const addResoruces = (craftResources) => {
      if (Array.isArray(craftResources)) {
        craftResources.forEach(resource => allNames.push(resource['@uniquename']));
      } else {
        allNames.push(craftResources['@uniquename']);
      }
    };

    addResoruces(item.craftingrequirements.craftresource);

    if ('enchantments' in item) {
      const enchantment = item.enchantments.enchantment;

      if (Array.isArray(enchantment)) {
        enchantment.forEach(ench => addResoruces(ench.craftingrequirements.craftresource))
      } else {
        addResoruces(enchantment.craftingrequirements.craftresource)
      }
    }
  }

  const generateSubtiersUpTo = (baseName, highestSubtier) => {
    let names = [];

    for (let subtier = 0; subtier <= highestSubtier; subtier++) {
      names.push(`${baseName}${subtier > 0 ? '@' + subtier : ''}`);
    }

    return names;
  }

  baseNames.forEach((baseName) => {
    if (baseName.includes('POTION')) {
      allNames.push(...generateSubtiersUpTo(baseName, 1));

      return;
    }

    if (baseName.includes('MEAL')) {
      allNames.push(...generateSubtiersUpTo(baseName, 3));

      return;
    }

    allNames.push(baseName);
  });

  return allNames;
}

module.exports = {
  createArrayOfAllJournals,
  getAllFoodAndPotionNames,
  createArrayOfAllFoodAndPotions
}