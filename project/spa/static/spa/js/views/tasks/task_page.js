define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/tasks/task',
  'views/tasks/comments',

], function($, _, Backbone, BoxView, TaskView, CommentsListView){
    var TaskPageView = Backbone.View.extend({

      initialize: function(options){
          this.task = new TaskView(options);
          this.comments = new CommentsListView(options);
      },

      render: function() {
          var boxView = new BoxView();
          boxView.render({
            el: '#box',
            context: {
              title: 'Задача',
              body: this.task.$el,
              footer: this.comments.$el
            }
          });
      }
    });

    return TaskPageView;
});