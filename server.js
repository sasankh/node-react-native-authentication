/* global global */
'use strict';

global.__base = __dirname;
global.__users = require(__base + '/server/config/config').users;

var express = require('express');
var helmet = require('helmet');
var cuid = require('cuid');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compression = require('compression');
var log4js = require('log4js');

var config = require(__base + '/server/config/config');

var logger;

// express instance
var app = express();

if(config.app.env === 'production' || config.app.env === 'stage' || config.app.env === 'dev') {
  app.set('port', 80);
} else {
  app.set('port', config.app.port);
}

// request id initializer for logger
var requestID = function(req, res, next) {
  req.requestId = cuid();
  req.passData = {};
  next();
};

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json()); // parses application/json
app.use(bodyParser.urlencoded({ extended: true })); // parses application/x-www-form-urlencoded
app.use(compression()); // compression middleware
app.use(methodOverride());  // HTTP verbs like PUT or DELETE
app.use(requestID); // request id for logger
app.use(helmet()); // implements 6 measures for security headers
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

// routes
require('./server/routes/index')(app);

//initialize
require('./server/init/init');

logger = require(__base + '/server/utilities/utils').logger.main;

// start listening
var server = app.listen(app.get('port'), function() {
  logger.info('[INITIALIZATION] --> server.js --> '+ config.application +' started at port : ' + app.get('port'));
});

if (config.app.request_timeout) {
  server.timeout = config.app.request_timeout;
}

module.exports = server;
