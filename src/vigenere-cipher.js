const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {

  constructor(direct = true) {
    this.direct = direct;
    this.maxOffset = "Z".codePointAt(0) - "A".codePointAt(0) + 1;
    this.startPosition = "A".codePointAt(0);
  }

  encrypt(message, key) {
    const [upperCaseMsg, upperCaseKey] = this.prepareParams(message, key);
    let result = "";
    let ingnoredSymbols = 0;
    for (let i = 0; i < upperCaseMsg.length; i++) {
      const symbol = upperCaseMsg.charCodeAt(i) - this.startPosition;
      const offset = upperCaseKey.charCodeAt(i - ingnoredSymbols) - this.startPosition;
      if (symbol >= 0 && symbol <= this.maxOffset) {
        result += String.fromCharCode(((symbol + offset) % this.maxOffset) + this.startPosition);
      } else {
        result += upperCaseMsg[i];
        ingnoredSymbols++;
      }
    }
    return this.direct ? result : result.split("").reverse().join("");
  }

  decrypt(message, key) {
    const [upperCaseMsg, upperCaseKey] = this.prepareParams(message, key);
    let result = "";
    let ingnoredSymbols = 0;
    for (let i = 0; i < upperCaseMsg.length; i++) {
      const symbol = upperCaseMsg.charCodeAt(i) - this.startPosition;
      const offset = upperCaseKey.charCodeAt(i - ingnoredSymbols) - this.startPosition;
      if (symbol >= 0 && symbol <= this.maxOffset) {
        result += String.fromCharCode(((symbol - offset + this.maxOffset) % this.maxOffset) + this.startPosition);
      } else {
        result += upperCaseMsg[i];
        ingnoredSymbols++;
      }
    }
    return this.direct ? result : result.split("").reverse().join("");
  }

  prepareParams(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    let upperCaseKey = key.toUpperCase();
    if (message.length > key.length) {
      upperCaseKey = upperCaseKey.repeat(Math.ceil(message.length / key.length));
    }
    return [message.toUpperCase(), upperCaseKey];
  }
}

module.exports = {
  VigenereCipheringMachine
};
