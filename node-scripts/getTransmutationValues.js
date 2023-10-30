const axios = require('axios');
const fs = require('fs');
const { getAllFoodAndPotionNames, getItems } = require('./utils');

function getResourceUniqueNames() {
  const resource = 'ORE';
  const names = [];

  for (let tier = 4; tier <= 8; tier++) {
    for (let subtier = 0; subtier <= 4; subtier++) {
      // skip 4.0 resource, cause it have no craftinrequirements
      if (tier === 4 && subtier === 0) {
        continue;
      }

      names.push(`T${tier}_${resource}${subtier === 0 ? '' : '_LEVEL' + subtier}`);
    }
  }

  return names;
}

function getTierAndSubtierByResourceName(resourceName) {
  const regex = /T(\d)_ORE(?:_LEVEL)?(\d)?/;
  const [, tier, subtier] = resourceName.match(regex);

  return {
    tier,
    subtier: subtier ?? 0
  }
}

async function main() {
  let dump = (await getItems());
  const resourceNames = getResourceUniqueNames();

  const transCostPrevSubtierFormula = JSON.parse(JSON.stringify(new Array(5).fill(new Array(5).fill(0))));
  const transCostPrevTierFormula = JSON.parse(JSON.stringify(new Array(5).fill(new Array(5).fill(0))));

  resourceNames.forEach(resourceName => {
    const resource = dump.items.simpleitem.find((item) => {
      return item['@uniquename'] === resourceName && item['@shopcategory'] === 'resources'
    });

    const { tier, subtier } = getTierAndSubtierByResourceName(resourceName);
    const recipes = [resource.craftingrequirements].flat();
    recipes.forEach(recipe => {
      const recipeCost = Number(recipe['@silver']);
      const tranmuteFromResource = recipe['craftresource']['@uniquename'];

      const { tier: transmuteFromTier, subtier: transmuteFromSubtier} = getTierAndSubtierByResourceName(tranmuteFromResource);

      if (transmuteFromTier < tier) {
        transCostPrevTierFormula[subtier][tier - 4] = recipeCost;
      }

      if (transmuteFromSubtier < subtier) {
        transCostPrevSubtierFormula[subtier][tier - 4] = recipeCost;
      }
    })
  });


  console.log('transCostPrevSubtierFormula', transCostPrevSubtierFormula);

  console.log('transCostPrevTierFormula', transCostPrevTierFormula);
}

main();
