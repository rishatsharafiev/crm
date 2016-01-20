define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/projects/project',


], function($, _, Backbone, BoxView, ProjectView, CommentsListView){
    var ProjectPageView = Backbone.View.extend({

      initialize: function(options){
          this.project = new ProjectView(options);
      },

      render: function() {
          var boxView = new BoxView();
          boxView.render({
            el: '#box',
            context: {
              title: 'Проект',
              body: this.project.$el,
              footer: null
            }
          });
      }
    });

    return ProjectPageView;
});