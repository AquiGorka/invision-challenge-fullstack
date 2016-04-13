/**
 * Parses an expression of the form positive integer, plus sign, positive integer, equal sign and returns an object with the two integers
 * @param {string} str The expression
 * @returns {object} An object with two integer values
 */
var parseExpression = str => {
  var data = str.replace('=', '').split('+');
  return {
    val1: parseInt(data[0]),
    val2: parseInt(data[1])
  };
};

/**
 * Returns an arithmetic expression between two numbers.
 * @param {int} v1 The first number.
 * @param {int} v2 The second number.
 * @param {string} [+] op The arithmetic operand to resolve.
 * @returns {int} The sum of the two numbers if the operand is the plus sign.
 * @returns {null} Returns null if the operand is not the plus sign.
 */
var evaluate = (v1, v2, op) => {
  var final = null;
  switch(op) {
    case '+':
      final = sum(v1, v2);
      break;
  }
  return final;
};

/**
 * Adds two numbers together.
 * @param {int} v1 The first number.
 * @param {int} v2 The second number.
 * @returns {int} The sum of the two numbers.
 */
var sum = (v1, v2) => {
  return v1 + v2;
};

module.exports = {
  parseExpression: parseExpression,
  evaluate: evaluate,
  sum: sum
};
