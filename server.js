// producer
var PORT = process.argv[2] || process.env.PORT || 8080,
  http = require('http'),
  connect = require('connect');

var arithmeticExpression = require('./plugins/arithmetic-expression'),
  logger = require('./plugins/logger');

connect()
  // middleware
  .use( '/', logger() )
  // handlers
  .use( '/', arithmeticExpression() )
  // listen
  .listen(PORT, () => { console.log('Server listening on port: ', PORT); })
