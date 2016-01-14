define([
  'jquery',
  'underscore',
  'backbone',
  'views/projects/list',
  'views/users/list',
  'views/auth/login'
], function($, _, Backbone, ProjectListView, UserListView, LoginView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'projects': 'showProjects',
      'users': 'showUsers',
      'login': 'showLogin',
      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('route:showProjects', function(){
      var projectListView = new ProjectListView();
      projectListView.render();
    });
    app_router.on('route:showUsers', function(){
      var userListView = new UserListView();
      userListView.render();
    });
    app_router.on('route:showLogin', function(){
      var loginView = new LoginView();
      loginView.render();
    });
    app_router.on('route:defaultAction', function(actions){
      console.log('No route:', actions);
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});