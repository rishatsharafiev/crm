define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/employees/employee',


], function($, _, Backbone, BoxView, EmployeesView){
    var EmployeesPageView = Backbone.View.extend({

      initialize: function(options){
          this.employees = new EmployeesView(options);
      },

      render: function() {
          var boxView = new BoxView();
          boxView.render({
            el: '#box',
            context: {
              title: 'Сотрудник',
              body: this.employees.$el,
              footer: null
            }
          });
      }
    });

    return EmployeesPageView;
});