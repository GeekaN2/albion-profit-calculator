import { getRawResourceNameByMaterial } from '../../store/utils';

/**
 * Generate item recipe
 */
export const getItemRecipe = (baseItemName: string, tier: number, subtier: number) => {
  let rawResource = `T${tier}_${getRawResourceNameByMaterial(baseItemName)}` +
    (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
  let material = `T${tier - 1}_${baseItemName}`;

  if (tier != 4 && subtier > 0) {
    material = material + `_LEVEL${subtier}@${subtier}`;
  }

  const recipe = {
    rawResource: {
      name: rawResource,
      quantity: Math.min(tier - 2, 5)
    },
    material: {
      name: material,
      quantity: 1
    }
  };

  return recipe;
};

export const getMaterialName = (baseItemName: string, tier: number, subtier: number): string => {
  let material = `T${tier}_${baseItemName}`;

  if (tier >= 4 && subtier > 0) {
    material = material + `_LEVEL${subtier}@${subtier}`;
  }


  return material;
};