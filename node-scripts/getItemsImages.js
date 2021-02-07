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
  const resources = ['PLANKS', 'METALBAR', 'LEATHER', 'CLOTH', 'STONEBLOCK', 'FIBER', 'ROCK', 'ORE', 'WOOD', 'HIDE'];
  
  let counter = 1;
  
  // Items where an error occurred when uploading image
  let badLoadedItems = [];
  let allItems = [];

  baseItemNames.forEach(baseItemName => {
    createArrayOfAllItems(baseItemName).forEach(item => allItems.push(item));

    if (isArtifactItem(baseItemName)) {
      createArrayOfAllArtifacts(baseItemName).forEach(artifact => allItems.push(artifact));
    }
  })

  resources.forEach(baseResource => createArrayOfAllResources(baseResource).forEach(resource => allItems.push(resource)));

  for (let item of allItems) {
    await downloadImage(item).then(() => {
      console.log(`Downloaded ${counter++}/${allItems.length}`, item);
    }).catch(() => {
      console.log(`Error while downloading ${counter}/${allItems.length}`, item);

      badLoadedItems.push(item);
    });
  }
  
  while (badLoadedItems.length > 1) {
    const item = badLoadedItems[badLoadedItems.length - 1];

    await downloadImage(item).then(() => {
      console.log(`Downloaded ${counter++}/${itemsQuantity}`, item);
      badLoadedItems.pop();
    }).catch(() => {
      console.log(`Error while downloading ${counter}/${itemsQuantity}`, item);
    });
  }
}

getImages();

/**
 * Creates an array with items of all tiers and subtiers
 * 
 * @param itemName - item name: T4_2H_NATURESTAFF_KEEPER etc.
 */
function createArrayOfAllItems(itemName) {
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
function createArrayOfAllResources(resource) {
  let allNames = [];

  for (let tier = 3; tier <= 8; tier++) {
    if (tier == 3) {
      allNames.push(`T${tier}_` + resource);

      continue;
    }

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

    return allNames;
  }

  if (itemName.includes('INSIGHT')) {
    allNames.push(`T4_SKILLBOOK_STANDARD`);

    return allNames;
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
  });

  response.data.pipe(sharp().resize(128, 128)).pipe(writer);
  
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}