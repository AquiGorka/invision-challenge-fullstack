var logger = require('../../lib/logger');

module.exports = (req, res, next) => {
  var time = Date.now();
  logger.log('Request Logger: Incoming request: ' + req.url);
  req.on('eror', () => { logger.error('Request Logger: Error: ' + req.url); });
  req.on('end', () => { logger.log('Request Logger: Response time: ' + (Date.now() - time)); });
  next();
};
