'use strict';

//module with all the api routes
var apiRoutes = require(__base + '/server/routes/api/routes');

//controllers
var health = require(__base + '/server/controllers/health');
var home = require(__base + '/server/controllers/home');
var login = require(__base + '/server/controllers/login');

exports = module.exports = function(app) {

  //GET
  app.get(apiRoutes.home,home.getHome);
  app.get(apiRoutes.healthCheck,health.checkServerStatus);

  //POST
  app.post(apiRoutes.login,login.login);
  app.post(apiRoutes.signup,login.signup);

  //PUT


  //DEL


};
