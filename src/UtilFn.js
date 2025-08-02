export function procentsDifferens(a, b) {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}
export function capitalaiz(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
