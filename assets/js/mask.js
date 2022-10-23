export const maskPlate = (value) => {
    let val; // last entered character
    let len; // length of total input with whitespaces
    let wsCount; // whitespace count (initially 1)
    if (value) {
        value = value.toUpperCase();
        len = value.replace(/\s/g, "").length;
        wsCount = value.split(' ').length;
        val = value.slice(-1);
        const isNumber = !isNaN(val);
        const isString = !isNumber;
        //* to prevent inputs like .,-*?=
        if (!isNumber && !(/[a-zA-Z]/).test(val)) {
            return value.slice(0, -1);
        }
        if (val === ' ') { return value.slice(0, -1) }
        if (wsCount >= 3) {
            if (len <= 9) {
                if (isString) {
                    return value.slice(0, -1);
                } else if (isNumber) {
                    return value;
                }
            }
        }
        if (len === 1 || len === 2) {
            if (isNumber) {
                return value;
            } else {
                value = '';
                return value;
            }
        } else if (len === 3) {
            if (isString) {
                value = value.slice(0, -1) + ' ' + val;
                return value;
            } else if (isNumber) {
                return value.slice(0, -1);
            }
        } else if (len == 4 || len == 5) {
            if (isString) {
                return value;
            } else if (isNumber) {
                value = value.slice(0, -1) + ' ' + val;
                return value;
            }
        } else if (len === 6) {
            if (isNumber) {
                value = value.slice(0, -1) + ' ' + val;
                return value;
            } else if (isString) {
                return value.slice(0, -1);
            }
        }
    }
}
