export function sortStrings(arr, param) {
  const result = [...arr];
  const sortingAsc = (a, b) => a.localeCompare(b, ["ru", "en"], {caseFirst: "upper"});
  const sortingDesc = (a, b) => b.localeCompare(a, ["ru", "en"], {caseFirst: "upper"});
  const sortedArr = result.sort(param === 'asc' ? sortingAsc : param === 'desc' ? sortingDesc : sortingAsc);
  return sortedArr;
}

