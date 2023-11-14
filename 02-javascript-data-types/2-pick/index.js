export const pick = (obj, ...fields) => {
    const newObj = {};
    for (const key in fields) {
      newObj[fields[key]] = obj[fields[key]];
    }
    return newObj;
};
