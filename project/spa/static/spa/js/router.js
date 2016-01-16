define(function(require){
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var BaseView = require('views/main/base');
  var LoginView = require('views/auth/login');
  var TaskListView = require('views/tasks/list');

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'showIndex',
      'login': 'showLogin',
      'tasks': 'showTasks',
      // Default
      '*actions': 'defaultAction'
    },

    before: function () {
      var baseView = new BaseView();
      baseView.render();
      if(!$.cookie('access_token')) {
        Backbone.navigate('login', true);
      }
    },
    after: function () {
        console.log('after');
    },

    showDefault: function(){
      var defaultView = new DefaultView();
      defaultView.render();
    },

    showIndex: function(){
      // var indexView = new IndexView();
      // indexView.render();
    },

    showLogin: function(){
      var loginView = new LoginView();
      loginView.render();
    },

    showTasks: function(){
      var taskListView = new TaskListView();
      taskListView.render();
    },
  });

  var app_router = new AppRouter;
  var initialize = function(){
    Backbone.navigate = function (loc) {
      app_router.navigate(loc, true);
    };

    Backbone.history.start();
  };
  return {
    initialize: initialize,
    router: app_router
  };
});