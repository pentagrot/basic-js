const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const config = {
    repeatTimes: setDefault(options.repeatTimes, 1),
    separator: setDefault(options.separator, "+"),
    addition: setDefault(options.addition, ""),
    additionRepeatTimes: setDefault(options.additionRepeatTimes, 0),
    additionSeparator: setDefault(options.additionSeparator, "|")
  }
  const addition = assembleAdditionalStr(config);
  let result = "";
  for (let i = 0; i < config.repeatTimes; i++) {
    result += str + addition;
    if (i !== config.repeatTimes - 1) {
      result += config.separator;
    }
  }
  return result;
}

function setDefault(value, defaule) {
  if (value === undefined) {
    return defaule;
  }
  return value;
}

function assembleAdditionalStr(options) {
  if (options.additionRepeatTimes === 0) {
    return options.addition;
  }
  let additionString = "";
  for (let i = 0; i < options.additionRepeatTimes; i++) {
    additionString += options.addition;
    if (i !== options.additionRepeatTimes - 1) {
      additionString += options.additionSeparator;
    }
  }
  return additionString;
}

module.exports = {
  repeater
};
