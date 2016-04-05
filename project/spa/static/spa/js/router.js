define(function(require){
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var ContainerView = require('views/main/container');

  var BaseView = require('views/main/base');
  var LoginView = require('views/auth/login');

  var TaskListView = require('views/tasks/tasks');
  var TaskAddPageView = require('views/tasks/task_add_page');
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
      'tasks/add': 'addTask',
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

    addTask: function(){
      var taskAddPageView = new TaskAddPageView();
      taskAddPageView.render();
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

    // showSubdivisions: function(){
    //   var subdivisionsListView = new SubdivisionsListView();
    //   subdivisionsListView.render();
    // },

    showSubdivisions: function(){

      var options = {
        el: '#box',
        views: {
          header: 'views/main/header',
          body: 'views/main/body',
          footer: 'views/main/footer'
        },

        data: {
          header: {
            title: 'Подразделения',
            button_name: 'Добавить подразделение',
            button_link: '/#subdivisions/add'
          },
          body: {

          },
          footer: {}
        }
      };

      var containerView = new ContainerView();
      containerView.render(options);

      var SubdivisionsListView = require('views/subdivisions/list');
      var subdivisionsListView = new SubdivisionsListView();
      subdivisionsListView.render();

      containerView.on('rendered', function() {
        this.body.$el.html(subdivisionsListView.grid);
        this.footer.$el.html(subdivisionsListView.paginator);
      }, containerView);
    },

    // showSubdivision: function(id){
    //   var options = {
    //     el: '#box',
    //     views: {
    //       header: 'views/main/header',
    //       body: 'views/main/body',
    //       footer: 'views/main/footer'
    //     },

    //     data: {
    //       header: {
    //         title: 'Подразделения',
    //         button_name: 'Добавить подразделение',
    //         button_link: '/#subdivisions/add'
    //       },
    //       body: {

    //       },
    //       footer: {}
    //     }
    //   };

    //   var containerView = new ContainerView();
    //   containerView.render(options);

    //   var SubdivisionView = require('views/subdivisions/page');

    //   if (id && id.match(/^\d+$/)){
    //     var subdivisionView = new SubdivisionView({id: id});
    //     subdivisionView.render();
    //     containerView.on('rendered', function() {
    //       this.body.$el.html(subdivisionView.el);
    //     }, containerView);
    //   }
    // },
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