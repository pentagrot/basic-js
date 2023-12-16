const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  return domains
    .map(val => {
      const tmp = val.split('.').reverse();
      return tmp.map((el, index) => {
        return "." + tmp.slice().splice(0, index + 1).join('.');
      })
    })
    .flat()
    .reduce((acuumulator, val) => {
      if (acuumulator[val]) {
        acuumulator[val]++;
      } else {
        acuumulator[val] = 1;
      }
      return acuumulator;
    }, {})
}

module.exports = {
  getDNSStats
};
