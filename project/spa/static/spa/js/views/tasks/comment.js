define([
  'jquery',
  'underscore',
  'backbone',
  'moment',

  'text!templates/tasks/comment.html'
], function($,
  _,
  Backbone,
  moment,
  commentsTemplate
){
  var CommentItemView = Backbone.View.extend({

      template: _.template( commentsTemplate ),

      initialize:function(){
      },

      render:function(){
        return this.template({ model: this.model.toJSON() });
      }
  });

  return CommentItemView;
});