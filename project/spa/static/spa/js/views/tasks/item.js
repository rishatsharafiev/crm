define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tasks/item.html',
  'models/task',
  'models/employee',
], function($, _, Backbone, taskTemplate, TaskModel, EmployeeTask){

  var TaskView = Backbone.View.extend({
    el: '#left-content',

    template:  _.template( taskTemplate ),

    initialize: function() {
      // this.model.bind('change', this.render, this);
      // this.model.bind('destroy', this.remove, this);
    },

    render: function(options) {
      var that = this;
      if(options.id) {
        that.task = new TaskModel({id: options.id });
        that.task.fetch({
          success: function(task) {
            that.$el.html(that.template({task: task}));
          }
        });
      } else {
        this.$el.html(this.template({task: null}));
      }
    }
  })

  return TaskView;
});