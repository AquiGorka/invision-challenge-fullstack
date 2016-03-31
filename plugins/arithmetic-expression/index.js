// arithmetic expression plugin
var connect = require('connect'),
  handler = require('./handler');

module.exports = function() {
  return connect().use('/arithmetic-expression', handler);
};
