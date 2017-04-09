
'use strict';

var should = require('should');
var	supertest = require('supertest');

var app = require('../../server');

var endpoint;
var sendBody;

describe('health', function() {

  before(function(done) {
    endpoint = '/health';
    done();
  });

  beforeEach(function(done) {

    sendBody = {};

    done();
  });

  after(function(done) {
    done();
  });

  /* Health Test */

  it('--> response 200 for health OK', function(done) {

    supertest(app)
    .get(endpoint)
    .send(sendBody)
    .end(function(err, res) {
      if(err) {
        throw err;
      }
      res.status.should.be.equal(200);

      done();
    });
  });

  it('--> response is an instanceOf(object)', function(done) {

    supertest(app)
    .get(endpoint)
    .send(sendBody)
    .end(function(err, res) {
      if(err) {
        throw err;
      }
      res.body.should.be.an.instanceOf(Object);
      done();
    });
  });

  it('--> response content-type is "application/json; charset=utf-8" should be JSON object', function(done) {
    supertest(app)
    .get(endpoint)
    .send(sendBody)
    .end(function(err, res) {
      if(err) {
        throw err;
      }
      res.header.should.have.property('content-type', 'application/json; charset=utf-8');
      done();
    });
  });

  it('--> response body object should not be empty', function(done) {
    supertest(app)
    .get(endpoint)
    .send(sendBody)
    .end(function(err, response) {
      if(err)
      throw err;

      response.body.should.not.equal('');
      response.body.should.not.equal(null);
      done();
    });
  });

  it('--> response body for health OK should have "health" attribute in response json', function(done) {
    supertest(app)
    .get(endpoint)
    .send(sendBody)
    .end(function(err, response) {
      if(err)
      throw err;

      response.body.should.have.property('health');
      done();
    });
  });

});
