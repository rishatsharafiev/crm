define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var TaskModel = Backbone.Model.extend({
    urlRoot: '/api/task/'
  });
  return TaskModel;
});