const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const digits = String(n).split('').map(Number)
  return Math.max(...digits.map((el, index) => { 
    const tmp = digits.slice(); 
    tmp.splice(index, 1); 
    return Number(tmp.join('')); 
  }))
}

module.exports = {
  deleteDigit
};
