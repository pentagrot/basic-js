const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  let summ = 0;
  matrix[0].forEach((element, index) => {
    summ += summColumn(index, matrix);
  });
  return summ;
}

function summColumn(columnNumber, matrix) {
  const column = matrix.map(row => row[columnNumber]);
  let summ = 0;
  for (let index = 0; index < column.length; index++) {
    if (column[index] === 0) {
      break;
    }
    summ += column[index];
  }
  return summ;
}

getMatrixElementsSum([
  [0, 1, 1, 2],
  [0, 5, 0, 0],
  [2, 0, 3, 3],
])

module.exports = {
  getMatrixElementsSum
};
