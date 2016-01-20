define(function(require){
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var BaseView = require('views/main/base');
  var LoginView = require('views/auth/login');
  var TaskListView = require('views/tasks/tasks');
  var TaskPageView = require('views/tasks/task_page');

  var ProjectListView = require('views/projects/projects');

  var EmployeesListView = require('views/employees/employees');
  var EmployeePageView = require('views/employees/employee_page');

  var SubdivisionsListView = require('views/subdivisions/subdivisions');

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'showTasks',
      'login': 'login',
      'logout': 'logout',
      'tasks': 'showTasks',
      'tasks/:id': 'showTask',
      'projects': 'showProjects',
      'employees': 'showEmployees',
      'employees/:id': 'showEmployee',
      'subdivisions': 'showSubdivisions',
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
        // console.log('aftet
    },

    showDefault: function(){
      var defaultView = new DefaultView();
      defaultView.render();
    },

    showIndex: function(){
      // var indexView = new IndexView();
      // indexView.render();
    },

    login: function(){
      var loginView = new LoginView();
      loginView.render();
    },

    logout: function(){
      $.removeCookie('access_token', { path: '/' });
      Backbone.navigate('', true);
    },

    showTasks: function(){
      var taskListView = new TaskListView();
      taskListView.render();
    },

    showTask: function(id){
      if (id && id.match(/^\d+$/)){
        var taskPageView = new TaskPageView({id: id});
        taskPageView.render();
      }
    },

    showProjects: function(){
      var projectListView = new ProjectListView();
      projectListView.render();
    },

    showEmployees: function(){
      var employeesListView = new EmployeesListView();
      employeesListView.render();
    },

    showEmployee: function(id){
      if (id && id.match(/^\d+$/)){
        var employeePageView = new EmployeePageView({id: id});
        employeePageView.render();
      }
    },

    showSubdivisions: function(){
      var subdivisionsListView = new SubdivisionsListView();
      subdivisionsListView.render();
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