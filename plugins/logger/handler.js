// this handler uses a common logger
var logger = require('../../lib/logger');

module.exports = (req, res, next) => {
  // log all incoming requests
  var time = Date.now();
  logger.log('Request Logger: Incoming request: ' + req.url);

  // log errors
  req.on('eror', () => {
    logger.error('Request Logger: Error: ' + req.url); });

  // when the request ends ltes log the time it took to end the response
  req.on('end', () => {
    logger.log('Request Logger: Response time: ' + (Date.now() - time)); });

  // carry on, this is just a middleware
  next();
};
