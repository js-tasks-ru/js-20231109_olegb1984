
export function sortStrings(arr, param) {
  let result = arr.slice(0, arr.length+1)
	result.sort((a, b) => a.localeCompare(b, 'ru-RU-u-kf-upper'));
	(param == 'asc') ? result :
	(param == 'desc') ? result.reverse() :
	 result
	return result;
}

