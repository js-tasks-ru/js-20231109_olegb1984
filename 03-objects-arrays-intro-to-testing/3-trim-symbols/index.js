/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return "";
  }
  if (!size) {
    return string;
  }
  if (string === "") {
    return "";
  }

  let count = 1;
  const symbols = string.split("");
  let newString = symbols[0];

  for (let i = 0; i < symbols.length-1; i++) {
    if (symbols[i+1] === symbols[i]){
      count++;
      if(count<=size){
        newString = newString+symbols[i];
      }
    }else{
      count=1;
      newString = newString+symbols[i+1];
    }
  }
  return newString;
}
