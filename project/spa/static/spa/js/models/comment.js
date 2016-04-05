define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var CommentModel = Backbone.Model.extend({
    urlRoot: '/api/comment'
  });
  return CommentModel;
});