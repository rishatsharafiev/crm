define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/tasks/task',

], function($, _, Backbone, BoxView, TaskView){



    var TaskPageView = Backbone.View.extend({

      initialize: function(options){
          this.task = new TaskView(options);
      },

      render: function() {
          var boxView = new BoxView();
          boxView.render({
            el: '#box',
            context: {
              title: 'Задача',
              body: this.task.$el,
              footer: null
            }
          });
      }
    });

    return TaskPageView;
});