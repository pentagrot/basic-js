const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  content: [],
  getLength() {
    return this.content.length;
  },
  addLink(value) {
    if (value === undefined) {
      this.content.push("   ");
    } else {
      this.content.push(value);
    }
    return this;
  },
  removeLink(position) {
    if (!Number.isInteger(position) || position < 1 || position > this.content.length) {
      this.content = [];
      throw new Error("You can't remove incorrect link!");
    }
    this.content.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this.content.reverse();
    return this;
  },
  finishChain() {
    const result = this.content
      .map(e => {
        return `( ${e} )`;
      }).join("~~");
    this.content = [];
    return result;
  }
};

module.exports = {
  chainMaker
};
