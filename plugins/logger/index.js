// logger  plugin
var connect = require('connect'),
  handler = require('./handler');

module.exports = function() {
  return connect().use('/', handler);
};
