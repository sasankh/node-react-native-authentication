'use strict';

var healthlog = require(__base + '/server/utilities/utils').logger.healthcheck;

// export functions
module.exports = {
  checkServerStatus : checkServerStatus
};

/**
* Function Name: checkServerStatus
* @api public
* Description: The function is to check if the server is up. Check of various
* connection to and from the server can be tested here. Like mysql, mongo, rabbit,
* etc connection
**/
function checkServerStatus(req, res){

  healthlog.debug('[' + req.requestId + ']: ' + 'checkServerStatus --> invoked');

  res.set('Content-Type', 'application/json');

  var response = {
    "health" : "NOT SURE"
  };

  var healthcheck = true;

  if(healthcheck){
    healthlog.debug('[' + req.requestId + ']: ' + "checkServerStatus --> Server passed all health check");
    response.health = "OK";
    res.status(200).send(response);
  }else{
    healthlog.error('[' + req.requestId + ']: ' + "Error-health --> checkServerStatus --> Server did not pass all health checks");
    response.health = "NOT OK";
    res.status(500).send(response);
  }

}
