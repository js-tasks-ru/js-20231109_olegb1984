/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  const set = new Set(arr);
  for (let key in set) {
    set.add(key);
  }
  return Array.from(set);
}
