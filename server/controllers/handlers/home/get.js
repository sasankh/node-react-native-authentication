'use strict';

var logger = require(__base + '/server/utilities/utils').logger;
var response = require(__base + '/server/utilities/utils').response;
var utilCommonChecks = require(__base + '/server/utilities/utils').utilCommonChecks;

var getHomeModule = require(__base + '/server/controllers/modules/home/get/getHomeModule');

module.exports = {
  getHome: getHome
};

/**
 * Function Name: getHome
 */
function getHome(req, res) {

  logger.request('getHome',req);

  req.passData.handler = 'getHome';

  utilCommonChecks.checkIfJsonRequest(req)
  .then(getHomeModule.responseCompiler)
  .then(function (data) {
    response.success(req, data, res);
  })
  .catch(function(err){
    response.failure(req, err, res);
  });

}
