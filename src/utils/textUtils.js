const removeAccents = ( text ) => {
    let textWithoutAccents = text;
    const HexAccentsMap = {
        a : /[\xE0-\xE6]/g,
        e : /[\xE8-\xEB]/g,
        i : /[\xEC-\xEF]/g,
        o : /[\xF2-\xF6]/g,
        u : /[\xF9-\xFC]/g,
        c : /\xE7/g,
        n : /\xF1/g
    };
    for (const letter in HexAccentsMap) {
        var regularExpression = HexAccentsMap[letter];
        textWithoutAccents = textWithoutAccents.replace( regularExpression, letter);
    }
    return textWithoutAccents;
}

export {
    removeAccents
};