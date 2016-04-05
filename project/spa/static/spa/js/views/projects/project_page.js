define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/tags/box_header',
  'views/projects/project',


], function($, _, Backbone, BoxView, BoxHeaderView, ProjectView, CommentsListView){
    var ProjectPageView = Backbone.View.extend({

      initialize: function(options){
          this.boxHeader = new BoxHeaderView({
            title: 'Проект',
            url: '#projects/add',
            url_name: 'Добавить проект'
          });
          this.project = new ProjectView(options);
      },

      render: function() {
          var boxView = new BoxView();
          boxView.render({
            el: '#box',
            context: {
              header: this.boxHeader.render(),
              body: this.project.$el,
              footer: null
            }
          });
      }
    });

    return ProjectPageView;
});