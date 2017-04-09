'use strict';

exports.application =  process.env.APPLICATION;

exports.app = {
  port: process.env.PORT || 3000,
  cryptoKey: process.env.CRYPTOKEY,
  env: process.env.ENVIRONMENT,
  request_timeout: process.env.REQUEST_TIMEOUT
};

exports.mysql = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT
};

exports.log = {
  log_level: process.env.MAIN_LOG_LEVEL || 'ALL',
  log_path: process.env.LOG_PATH || '.'
};

exports.users = {
  usernames: [
    'Sasankh',
    'Rock',
    'Karla',
    'Samantha'
  ],
  passwords: [
    'Test1234',
    'Interesting'
  ]
};
