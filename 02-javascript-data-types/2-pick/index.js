export const pick = (obj, ...fields) => {
    let pickMap = new Map();
    for (let key in fields) {
        pickMap.set(fields[key], obj[fields[key]]);
    }
    let newObj = Object.fromEntries(pickMap);
    return newObj;
};