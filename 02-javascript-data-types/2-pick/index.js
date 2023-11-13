export const pick = (obj, ...fields) => {
    const pickMap = new Map();
    for (let key in fields) {
        pickMap.set(fields[key], obj[fields[key]]);
    }
  const newObj = Object.fromEntries(pickMap);
    return newObj;
};
