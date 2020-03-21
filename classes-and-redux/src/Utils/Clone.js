export function deepClone(obj) {
    let recipient = obj;

    if (recipient && typeof obj === "object") {
        recipient = obj instanceof Array ? [] : {};
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                recipient[i] = deepClone(obj[i]);
            }
        }
    }

    return recipient;
}