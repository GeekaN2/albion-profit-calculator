const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// e.g. https://render.albiononline.com/v1/item/T6_2H_INFERNOSTAFF_MORGANA.png
const imagesApiUrl = "https://render.albiononline.com/v1/item/";

async function getImages() {
  let recipes = fs.readFileSync('./static/json/recipes.json');
  recipes = JSON.parse(recipes);

  // Array of T4 item names
  const baseItemNames = Object.keys(recipes);
  const resources = ['PLANKS', 'METALBAR', 'LEATHER', 'CLOTH'];
  const itemsQuantity = 5160;
  let counter = 1;
  
  // Items where an error occurred when uploading image
  let badLoadedItems = [];

  for (let baseItemName of baseItemNames) {
    for (let item of createStringOfAllItems(baseItemName)) {
      downloadImage(item).then(() => {
        console.log(`Downloaded ${counter++}/${itemsQuantity}`, item);
      }).catch(() => {
        console.log(`Error while downloading ${counter}/${itemsQuantity}`, item);
        badLoadedItems.push(item);
      });

      await sleep(20);
    }

    if (isArtifactItem(baseItemName)) {
      for (let artifact of createArrayOfAllArtifacts(baseItemName)) {
        downloadImage(artifact).then(() => {
          console.log(`Downloaded ${counter++}/${itemsQuantity}`, artifact);
        }).catch(() => {
          console.log(`Error while downloading ${counter}/${itemsQuantity}`, artifact);
          badLoadedItems.push(artifact);
        });
      }

      await sleep(20);
    }
  }

  for (let baseResource of resources) {
    for (let resource of createStringOfAllResources(baseResource)) {
      downloadImage(resource).then(() => {
        console.log(`Downloaded ${counter++}/${itemsQuantity}`, resource);
      }).catch(() => {
        console.log(`Error while downloading ${counter}/${itemsQuantity}`, resource);
        badLoadedItems.push(resource);
      });
  
      await sleep(20);
    }
  }

  while (badLoadedItems.length > 1) {
    const item = badLoadedItems[badLoadedItems.length - 1];

    downloadImage(item).then(() => {
      console.log(`Downloaded ${counter++}/${itemsQuantity}`, item);
      badLoadedItems.pop();
    }).catch(() => {
      console.log(`Error while downloading ${counter}/${itemsQuantity}`, item);
    });

    await sleep(20);
  }
}

getImages();

/**
 * Creates an array with items of all tiers and subtiers
 * 
 * @param itemName - item name: T4_2H_NATURESTAFF_KEEPER etc.
 */
function createStringOfAllItems(itemName) {
  let allNames = [];

  for (let tier = 4; tier <= 8; tier++) {
    for (let subtier = 0; subtier <= 3; subtier++) {
      allNames.push(`T${tier}` + itemName.slice(2) + (subtier != 0 ? `@${subtier}` : ''));
    }
  }

  return allNames;
}

/**
 * Creates an array with materials of all tiers and subtiers
 * 
 * @param resource - basic resource: PLANKS, CLOTH etc.
 * @returns string with all tiers and subtiers for materials
 */
function createStringOfAllResources(resource) {
  let allNames = [];

  for (let tier = 4; tier <= 8; tier++) {
    for (let subtier = 0; subtier <= 3; subtier++) {
      allNames.push(`T${tier}_` + resource + (subtier != 0 ? `_LEVEL${subtier}@${subtier}` : ''));
    }
  }

  return allNames;
}

/**
 * Creates an array with artefacts of all tiers
 * 
 * @param itemName - artefact item name: T4_2H_NATURESTAFF_KEEPER etc.
 * @returns string with all tiers for artefacts
 */
function createArrayOfAllArtifacts(itemName) {
  let allNames = [];

  if (itemName.includes('ROYAL')) {
    for (let tier = 4; tier <= 8; tier++) {
      allNames.push(`QUESTITEM_TOKEN_ROYAL_T${tier}`);
    }

    return allNames.slice(0, -1);
  }

  if (itemName.includes('INSIGHT')) {
    for (let tier = 4; tier <= 8; tier++) {
      allNames.push(`T${tier}_RANDOM_DUNGEON_SOLO_TOKEN_1`);
    }

    return allNames.slice(0, -1);
  }

  for (let tier = 4; tier <= 8; tier++) {
    allNames.push(`T${tier}_ARTEFACT${itemName.slice(2)}`);
  }

  return allNames;
}

/**
 * Looking for an artifact substring in an item name
 * 
 * @param itemName - item name: T4_ARTEFACT_HEAD_CLOTH_HELL etc.
 */
function isArtifactItem(itemName) {
  const artifacts = ['UNDEAD', 'KEEPER', 'HELL', 'MORGANA', 'AVALON', 'ROYAL', "INSIGHT"];

  if (!itemName) {
    return false;
  }

  return artifacts.some(artifact => itemName.includes(artifact));
}

/**
 * Sleep for a few ms
 * 
 * @param {number} ms 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Download image
 * 
 * @param {string} imageName 
 */
async function downloadImage(imageName) {
  const url = `${imagesApiUrl}${imageName}.png`;
  const imagePath = path.resolve(__dirname, '../static/images/items', `${imageName}.png`);
  const writer = fs.createWriteStream(imagePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(sharp().resize(128, 128)).pipe(writer);
  
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}