export function sortStrings(arr, param) {
  const result = [...arr];
  const sortingAsc = (a, b) => a.localeCompare(b, ["ru", "en"], {caseFirst: "upper"});
  const sortingDesc = (a, b) => b.localeCompare(a, ["ru", "en"], {caseFirst: "upper"});
  return result.sort(param === 'desc' ? sortingDesc : sortingAsc);
}

