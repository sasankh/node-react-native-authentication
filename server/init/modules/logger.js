'use strict';

var log4js = require('log4js');
var fs = require('fs');
var async = require('async');

var config = require(__base + '/server/config/config');

var logFolderName = 'logs';
var logLeveList = [
  'ALL',
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
  'FATAL',
  'OFF'
];

switch (config.app.env){
  case 'production':
  logFolderName = 'logs';
  break;

  case 'stage':
  logFolderName = 'logs-stage';
  break;

  case 'dev':
  logFolderName = 'logs-dev';
  break;

  default:
  logFolderName = 'logs';
}

var main;
var healthcheck;
var auth;
var http;

var logDirs = [
  "/" + logFolderName,
  "/" + logFolderName + '/main',
  "/" + logFolderName + '/health',
  "/" + logFolderName + '/auth',
  "/" + logFolderName + '/access'
];

async.map(logDirs, function(path, callback){

  try {

    fs.mkdirSync(config.log.log_path + path);
    callback(null, true);

  } catch(e) {

    if ( e.code === 'EEXIST' ) {
      callback(null, true);
    }else{
      callback(e, false);
    }

  }

},function(err, results){

  if(err){
    throw err;
  }else{
    initializeLog4js();
  }

});

function initializeLog4js(){

  log4js.configure(
    {
      'appenders': [
        {
          "type": "console"
        },
        {
          "type": "clustered",
          "appenders": [
            {
              "type": "dateFile",
              "category": "http",
              "filename": config.log.log_path + "/" + logFolderName + "/access/access",
              "pattern": "-yyyy-MM-dd.log",
              "alwaysIncludePattern": true,
              "layout": {
                "type": "pattern",
                "pattern": "[%d{ISO8601}] [%p] - %c - %m%n"
              }
            },
            {
              "type": "dateFile",
              "filename": config.log.log_path + "/" + logFolderName + "/main/main",
              "category": "application",
              "pattern": "-yyyy-MM-dd.log",
              "alwaysIncludePattern": true,
              "layout": {
                "type": "pattern",
                "pattern": "[%d{ISO8601}] [%p] - %c - %m%n"
              }
            },
            {
              "type": "dateFile",
              "filename": config.log.log_path + "/" + logFolderName + "/health/health",
              "category": "health-check",
              "pattern": "-yyyy-MM-dd.log",
              "alwaysIncludePattern": true,
              "layout": {
                "type": "pattern",
                "pattern": "[%d{ISO8601}] [%p] - %c - %m"
              }
            },
            {
              "type": "dateFile",
              "filename": config.log.log_path + "/" + logFolderName + "/auth/auth",
              "category": "auth",
              "pattern": "-yyyy-MM-dd.log",
              "alwaysIncludePattern": true,
              "layout": {
                "type": "pattern",
                "pattern": "%d{yyyy-MM-dd hh:mm:ss,SSS} %m"
              }
            }
          ]
        }
      ]
    }
  );

  main = log4js.getLogger('application');
  healthcheck = log4js.getLogger('health-check');
  auth = log4js.getLogger('auth');
  http = log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' });

  if(logLeveList.indexOf(config.log.log_level) > -1){
    main.info('Log level set to: ' + config.log.log_level);
    main.setLevel(config.log.log_level);
  }else{
    main.info('Log level set to: ALL (default)');
    main.setLevel('ALL');
  }

}

module.exports = {
  main : main,
  healthcheck : healthcheck,
  auth : auth,
  http : http
};
