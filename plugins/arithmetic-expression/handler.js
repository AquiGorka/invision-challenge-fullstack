var qs = require('qs'),
  utils = require('./utils'),
  url = require('url');
  logger = require('../../lib/logger');

module.exports = (req, res, next) => {
  var exp = qs.parse(url.parse(req.url).query).exp,
    str = '';

  // no expression
  if (!exp) {
    str = 'No expression in query string';
    logger.error('Arithmetic Expression: Error: ' + str);
    res.statusCode = 400;
    res.end(str);
    return;
  }

  // parse expression
  var parsedExpression = utils.parseExpression(exp);

  // if there is an error with the parsed expression: it did not return two positive integers
  if (!( (Number.isInteger(parsedExpression.val1) && parsedExpression.val1 > 0) &&
          (Number.isInteger(parsedExpression.val2)) && parsedExpression.val2 > 0) ) {
    str = 'Malformed expression: Please provide an expression with the following format: positive integer, plus sign, positive integer, equal sign (e.g. \'1+1=\'). Make sure you url encode the plus sign to %2B';
    logger.error('Arithmetic Expression: Error: ' + str);
    res.statusCode = 400;
    res.end(str);
    return;
  }

  // evaluate expression
  var result = utils.evaluate(parsedExpression.val1, parsedExpression.val2, '+');

  // if the result is not an integer
  if (!result || !Number.isInteger(result)) {
    str = 'Something went wrong on our side: All artihmetic expressions are created equal but some arithmetic expressions are more equal than others';
    logger.error('Arithmetic Expression: Error: ' + str);
    res.statusCode = 500;
    res.end(str);
    return;
  }

  // everything went OK
  logger.log('Arithmetic Expression: Request: ' + req.url);
  logger.log('Arithmetic Expression: Expression: ' + parsedExpression.val1 + '+' + parsedExpression.val2);
  logger.log('Arithmetic Expression: Result: ' + result);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({res: result}));
};
