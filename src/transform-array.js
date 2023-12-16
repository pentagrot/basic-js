const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const result = [];
  let deleteNext = false;
  arr.forEach((val, index, array) => {
    if (val === "--discard-prev") {
      if (array[index - 2] !== "--discard-next") {
        result.pop();
      }
      return;
    }
    if (val === "--double-prev") {
      if (result.length > 0) {
        if (array[index - 2] !== "--discard-next") {
          result.push(result[result.length - 1]);
        }
      }
      return;
    }
    if (val === "--double-next") {
      if (index !== array.length - 1) {
        if (array[index + 2] !== "")
          result.push(array[index + 1]);
      }
      return;
    }
    if (val === "--discard-next") {
      deleteNext = true;
      return;
    }
    if (deleteNext) {
      deleteNext = false;
    } else {
      result.push(val);
    }
  });

  return result;
}

module.exports = {
  transform
};
