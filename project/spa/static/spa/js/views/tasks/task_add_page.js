define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/tags/box_header',
  'views/tasks/task_add',
], function($, _, Backbone, BoxView, BoxHeaderView, TaskView){
    var TaskPageView = Backbone.View.extend({

      initialize: function(options){
          this.task_header = new BoxHeaderView({
            title: 'Добавление задачи',
            url: '#tasks',
            url_name: 'Назад'
          });
          this.task_body = new TaskView(options);
      },

      render: function() {
          var boxView = new BoxView();
          boxView.render({
            el: '#box',
            context: {
              header: this.task_header.render(),
              body: this.task_body.render(),
              footer: null
            }
          });
      }
    });

    return TaskPageView;
});