function createStringOfAllTiers(itemName: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier <= 3; subtier++) {
            allNames = allNames + `T${tier}` + itemName.slice(2) + (subtier != 0 ? `@${subtier}` : '') + ',';
        }
    }

    return allNames.slice(0, -1);
}

function createStringOfAllResources(resource: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier <= 3; subtier++){
            allNames = allNames + `T${tier}_` + resource + (subtier != 0 ? `_LEVEL${subtier}@${subtier}` : '') + ',';
        }
    }

    return allNames.slice(0, -1);
}

function createStringOfAllArtefacts(itemName: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        allNames = allNames + `T${tier}_ARTEFACT${itemName.slice(2)},`;
    }
    return allNames.slice(0, -1);
}

function createStringOfAllJournals(root: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        allNames = allNames + `T${tier}_JOURNAL_${root.slice(5)}_EMPTY,`;
        allNames = allNames + `T${tier}_JOURNAL_${root.slice(5)}_FULL,`;
    }

    return allNames.slice(0, -1);
}

export {
    createStringOfAllTiers, 
    createStringOfAllResources, 
    createStringOfAllArtefacts,
    createStringOfAllJournals
};
