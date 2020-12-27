
var english = /^[A-Za-z0-9_]*$/;
var number = /^[0-9]*$/

function compare(word1, word2, alphabet) {
    const size1 = word1.length;
    const size2 = word2.length;
    const size = Math.max(size1, size2);

    if (number.test(word1) && number.test(word2)) {
        if (word1 < word2) {
            return false;
        } else {
            return true;
        }
    } else if (number.test(word1) && !number.test(word2)) {
        return true;
    } else if (!number.test(word1) && number.test(word2)) {
        return false;
    } else if (isEnglish(word1) && isEnglish(word2)) {
        return word1 > word2;
    } else if (isEnglish(word1) && !isEnglish(word2)) {
        return true;
    } else if (!isEnglish(word1) && isEnglish(word2)) {
        return false;
    } else {
        for (let i = 0; i < size; i++) {
            let c1 = word1[i];
            let c2 = word2[i];
            if (c2 === undefined) {
                return false;
            }
            else if (c1 === undefined) {
                return true;
            }
            const index1 = alphabet.indexOf(c1);
            const index2 = alphabet.indexOf(c2);

            if (index1 < index2) {
                return false;
            }
            else if (index1 === index2) {
                continue;
            }
            else {
                return true;
            }
        }

        return true;
    }
}

function isEnglish(word) {
    let index = 0;
    while (word.length > 1) {
        if (english.test(word.charAt(index))) {
            index++;
            word = word.substr(0, index);
            continue;
        } else {
            return false;
        }
    }
    return true;
}

export default compare;