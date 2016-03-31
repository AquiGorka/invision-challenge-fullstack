// consumer
var PORT = process.argv[2] || process.env.PORT || 8080,
  rp = require('request-promise'),
  logger = require('./lib/logger');

var fetch = (obj) => {
  var time = Date.now();
  logger.log('Fetching: ' + obj.url);
  rp({uri: obj.url, json: true })
    .then(res => { logger.log('Result: ' + res.res); })
    .catch(err => { logger.error('Error: ' + err.message); })
    .done(() => {logger.log('Response time: ' + (Date.now() - time)); })
};

var getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateExpression = () => {
  return getRandomInt(1, 100) + '%2B' + getRandomInt(1, 100) + '=';
};

var interval = setInterval(() => {
  var url = 'http://localhost:' + PORT + '/arithmetic-expression/?exp=',
  exp = generateExpression();
  fetch({ url: url + exp});
}, 100);

setTimeout(() => { clearInterval(interval); }, 30000)
