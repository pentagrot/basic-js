const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  const symbols = str.split("");
  if (symbols.length === 0) {
    return "";
  }
  const result = [];
  let counter = 1;
  let currentSymbol = symbols[0];
  for (let i = 1; i < symbols.length; i++) {
    if (currentSymbol === symbols[i]) {
      counter++;
      continue;
    }
    if (counter > 1) {
      result.push(counter);
    }
    result.push(currentSymbol);
    currentSymbol = symbols[i];
    counter = 1;
  }
  if (counter > 1) {
    result.push(counter);
  }
  result.push(currentSymbol);
  return result.join("");
}

module.exports = {
  encodeLine
};
