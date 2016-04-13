// producer
var PORT = process.argv[2] || process.env.PORT || 8080,
  http = require('http'),
  connect = require('connect');

var arithmeticExpression = require('./plugins/arithmetic-expression'),
  logger = require('./plugins/logger');

/*
  Define middlewares and handlers to be used by this server
  Routes can be set/namespaced here in order to use middlewares & handlers for all requests or for specific routes
  Add as many middlewares/handlers as needed:
    .use( ':path', pluginInstaller() )
  Fire up server at the desired PORT
*/
connect()
  // middleware
  .use( '/', logger() )
  // handlers
  .use( '/arithmetic-expression', arithmeticExpression() )
  // listen
  .listen(PORT, () => { console.log('Server listening on port: ', PORT); })
