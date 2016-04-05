define([
  'underscore',
  'backbone',
  'models/comment'
], function(_, Backbone, CommentModel){
  var CommentCollection = Backbone.Collection.extend({
      model: CommentModel,
      url: '/api/comment',
      parse: function(response) {
        return response.results;
      }
  });

  return CommentCollection;
});