// arithmetic expression plugin
var connect = require('connect'),
  handler = require('./handler');

// define route and handler to be used
module.exports = function() {
  return connect().use('/', handler);
};
