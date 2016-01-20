define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var TaskModel = Backbone.Model.extend({
    urlRoot: '/api/subdivision',
    validate: function(attrs, options) {

    }
  });
  return TaskModel;
});