
export function sortStrings(arr, param) {
  const result = [...arr];
	result.sort((a, b) => a.localeCompare(b, 'ru-RU-u-kf-upper'));
	(param == 'asc') ? result :
	(param == 'desc') ? reverseArray(result) :
	 result
	return result;
}

function reverseArray(arr){
let lastElem = arr.length-1;

  for(let i=0; i<lastElem; i++){
   [arr[i], arr[lastElem]] = [arr[lastElem], arr[i]];
   
   lastElem--;
  }
}

