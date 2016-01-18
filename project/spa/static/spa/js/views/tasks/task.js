define([
  'jquery',
  'underscore',
  'backbone',
  'moment',

  'views/main/box',

  'text!templates/tasks/task.html',
  'models/task',

], function($, _, Backbone, moment, BoxView, taskTemplate, TaskModel){

  var TaskView = Backbone.View.extend({

    template:  _.template( taskTemplate ),

    initialize: function(options){
        this.model = new TaskModel({id: options.id });
        this.model.fetch({reset: true});

        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.render);
    },

    render: function() {
        this.$el.html(this.template({ task: this.model.toJSON(), moment: moment }));
        return this.$el;
    },

    events: {
        'click .edit' : 'edit',
        'click .destroy': 'destroy'
    },

    edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
    },

    destroy: function(){
        this.model.destroy();
    },

    remove: function() {
        Backbone.navigate('tasks');
    }
  })

  return TaskView;
});