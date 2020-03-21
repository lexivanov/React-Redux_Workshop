export const dollarsPresenter = num => {
    const numParts = num.toFixed(2).toString().split('.');
    let comasNeeded = Math.floor((numParts[0].length - 1) / 3);
    let comasSetted = 0;
    while (comasSetted < comasNeeded) {
        numParts[0] = insertToString(numParts[0], ',', numParts[0].length - (3 * (comasSetted + 1) + comasSetted));
        comasSetted++;
    }

    return `$${numParts.join('.')}`;
};

export const insertToString = (string, insert, position) => string.slice(0, position) + insert + string.slice(position);
