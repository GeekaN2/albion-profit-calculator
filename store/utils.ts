function createStringOfAllTiers(baseName: string) {
    let allNames = '';
    for (let tier = 4; tier <= 8; tier++){
        for (let subtier = 0; subtier <= 3; subtier++) {
            allNames = allNames + `T${tier}` + baseName.slice(2) + (subtier != 0 ? `@${subtier}` : '') + ',';
        }
    }
    return allNames.slice(0, -1);
}

export {createStringOfAllTiers};