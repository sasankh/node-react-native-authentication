'use strict';

var config = require(__base + '/server/config/config');

var encryptor = require('simple-encryptor')(config.app.cryptoKey);

module.exports.encrypt = function(value) {
  if (encryptor === 'undefined'){
    encryptor = require('simple-encryptor')(config.app.cryptoKey);
  }

  return encryptor.encrypt(value);
};

module.exports.decrypt = function(value) {
  if (encryptor === 'undefined'){
    encryptor = require('simple-encryptor')(config.app.cryptoKey);
  }
  
  return encryptor.decrypt(value);
};
