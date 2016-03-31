var chai = require('chai'),
  should = chai.should(),
  httpMocks = require('node-mocks-http'),
  utils = require('../plugins/arithmetic-expression/utils'),
  handler = require('../plugins/arithmetic-expression/handler');

describe('Arithmetic Expression', () => {
  describe('utils', () => {
    describe('#parseExpression', () => {
      it('should return an object', () => {
        utils.parseExpression('1+2=').should.be.a('Object');
      });
      it('should return 1 for val1 for 1+2=', () => {
        utils.parseExpression('1+2=').val1.should.equal(1);
      });
      it('should return 1 for val2 for 1+2=', () => {
        utils.parseExpression('1+2=').val2.should.equal(2);
      });
      it('should return a number for val1 for 1+2=', () => {
        utils.parseExpression('1+2=').val1.should.be.a('number');
      });
      it('should return a number for val2 for 1+2=', () => {
        utils.parseExpression('1+2=').val2.should.be.a('number');
      });
      it('should return NaN for val1 for a+2=', () => {
        utils.parseExpression('a+2=').val1.should.be.NaN;
      });
      it('should return NaN for val2 for 1+b=', () => {
        utils.parseExpression('1+b=').val2.should.be.NaN;
      });
      it('should return a number greater than zero for val1 for 1+2=', () => {
        utils.parseExpression('1+2=').val1.should.gt(0);
      });
      it('should return a number greater than zero for val2 for 1+2=', () => {
        utils.parseExpression('1+2=').val2.should.gt(0);
      });
    });
    describe('#evaluate', () => {
      it('should return a number for params 1,2,+', () => {
        utils.evaluate(1,2,'+').should.be.a('number');
      });
      it('should return null for params 1,2,-', () => {
        should.not.exist(utils.evaluate(1,2,'-'));
      });
      describe('#sum', () => {
        it('should return the sum of the parameters for 1,2', () => {
          utils.sum(1,2).should.equal(3);
        });
      });
    });
  });
  //
  describe('handler', () => {
    it('should return status code 400 for no expression in request', done => {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/arithmetic-expression'
      }),
      res = httpMocks.createResponse();
      //
      handler(req, res);
      res.statusCode.should.equal(400);
      done();
    });
    it('should return status code 400 for malformed expression in request', done => {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/arithmetic-expression?exp=a%2B2='
      }),
      res = httpMocks.createResponse();
      //
      handler(req, res);
      res.statusCode.should.equal(400);
      done();
    });
    it('should return status code 200 for correct request', done => {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/arithmetic-expression?exp=1%2B2='
      }),
      res = httpMocks.createResponse();
      //
      handler(req, res);
      res.statusCode.should.equal(200);
      done();
    });
  });
});

