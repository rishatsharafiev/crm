define([
  'jquery',
  'underscore',
  'backbone',
  'views/projects/list',
  'views/users/list',
  'views/auth/login',
  'jquery.cookie',
], function($, _, Backbone, ProjectListView, UserListView, LoginView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'showIndex',
      'projects': 'showProjects',
      'users': 'showUsers',
      'login': 'showLogin',
      // Default
      '*actions': 'defaultAction'
    },

    before: function () {
      if(!$.cookie('access_token')) {
        Backbone.navigate('login', true);
      }
    },
    after: function () {
        console.log('after');
    },

    showIndex: function(){
      console.log('index');
    },

    showProjects: function(){
      var projectListView = new ProjectListView();
      projectListView.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.navigate = function (loc) {
      app_router.navigate(loc, true);
    };

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