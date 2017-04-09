'use strict';

var logger = require(__base + '/server/utilities/utils').logger;
var response = require(__base + '/server/utilities/utils').response;
var utilCommonChecks = require(__base + '/server/utilities/utils').utilCommonChecks;

module.exports = {
  login: login,
  signup: signup
};

/**
 * Function Name: login
 */
function login(req, res) {

  logger.request('login',req);

  req.passData.handler = 'login';

  var fid = {
    requestId: req.requestId,
    handler: req.passData.handler,
    functionName: 'login'
  };

  logger.debug(fid, 'Body', req.body);

  var status = 200;
  var responseBody = {
    login: false,
    message: 'Unable to login'
  };

  if(global.__users.usernames.indexOf(req.body.username)  > -1 && global.__users.passwords.indexOf(req.body.password) > -1) {
    status = 200;
    responseBody.login = true;
    responseBody.message = "Successfully logged in";
    responseBody.token = req.body.username.toLowerCase();
  } else {
    status = 403;
    responseBody.login = false;
    responseBody.message = "Invalid credentials";
  }

  res.status(status).send(responseBody);

}



/**
 * Function Name: signup
 */
function signup(req, res) {

  logger.request('signup',req);

  req.passData.handler = 'signup';

  var fid = {
    requestId: req.requestId,
    handler: req.passData.handler,
    functionName: 'signup'
  };

  logger.debug(fid, 'Body', req.body);

  var status = 200;
  var responseBody = {
    signup: false,
    message: 'Unable to signup user'
  };

  console.log(req.body.username);

  if(req.body.username && req.body.password) {

    if(global.__users.usernames.indexOf(req.body.username.trim()) > -1) {
      status = 400;
      responseBody.signup = false;
      responseBody.message = "Username in use";
    } else {
      if(req.body.username.trim() === '') {
        status = 400;
        responseBody.signup = false;
        responseBody.message = "Username cannot be empty";
      } else {
        if(req.body.password.trim() === '') {
          status = 400;
          responseBody.signup = false;
          responseBody.message = "Password cannot be empty";
        } else {
          global.__users.usernames.push(req.body.username.trim());
          global.__users.passwords.push(req.body.password);
          status = 200;
          responseBody.signup = true;
          responseBody.message = "User successfully signed up";
        }
      }
    }

  } else {
    status = 400;
    responseBody.login = false;
    responseBody.message = "Required parameters missing";
  }

  res.status(status).send(responseBody);

}
