'use strict';
var config = require(__base + '/server/config/config');

var mysql  = require('mysql');
var db;

function initializeMysql(){
  db = mysql.createPool({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database,
    port: config.mysql.port
  });
}

initializeMysql();

module.exports = db;
