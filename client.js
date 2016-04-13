// consumer
var PORT = process.argv[2] || process.env.PORT || 8080,
  rp = require('request-promise'),
  logger = require('./lib/logger');

/**
 * Fetches a url and logs the result
 * @param {object} obj The object with parameters to fecth
 * @param {string} obj.uri The uri to fetch
 * @returns {void}
 */
var fetch = (obj) => {
  var time = Date.now();
  logger.log('Fetching: ' + obj.url);
  rp({uri: obj.url, json: true })
    .then(res => { logger.log('Result: ' + res.res); })
    .catch(err => { logger.error('Error: ' + err.message); })
    .done(() => {logger.log('Response time: ' + (Date.now() - time)); })
};

/**
 * Returns a random integer between the set limits (inclusive)
 * @param {int} min An integer that sets the minimum limit to return
 * @param {int} max An integer that sets the maximum limit to return
 * @returns {int} An integer
 */
var getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Generates a random expression of the form positive integer, plus sign, positive integer, equal sign
 * @returns {string} An expression
 */
var generateExpression = () => {
  return getRandomInt(1, 100) + '%2B' + getRandomInt(1, 100) + '=';
};

/*
  Every 100 ms we generate an expression and fetch the result via the server service
*/
var interval = setInterval(() => {
  var url = 'http://localhost:' + PORT + '/arithmetic-expression/?exp=',
  exp = generateExpression();
  fetch({ url: url + exp});
}, 100);

// After 30 seconds we stop the client
setTimeout(() => { clearInterval(interval); }, 30000)
