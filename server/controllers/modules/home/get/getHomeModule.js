'use strict';

var Q = require('q');

var logger = require(__base + '/server/utilities/utils').logger;

/**
  * Function Name: responseCompiler
**/
module.exports.responseCompiler = function(req) {

  var deferred = Q.defer();

  var fid = {
    requestId: req.requestId,
    handler: req.passData.handler,
    functionName: 'responseCompiler'
  };

  logger.debug(fid,'invoked');

  var responseBody = {
    status: 'OK',
    message: 'Server is up'
  };

  if (responseBody) {
    deferred.resolve(responseBody);
  } else {
    deferred.reject({error: { code: 102, message: 'Sample warn reject', fid: fid, type: 'warn', trace: null, defaultMessage:false } });
  }

  return deferred.promise;

};
