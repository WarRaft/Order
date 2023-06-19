function generateStrings(prefix, length) {
    if (length === 0) {
        console.log(prefix);
        return;
    }

    for (let charCode = 48; charCode <= 122; charCode++) {
        if (charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 122) {
            const character = String.fromCharCode(charCode);
            generateStrings(prefix + character, length - 1);
        }
    }
}

generateStrings("", 2);

export {}