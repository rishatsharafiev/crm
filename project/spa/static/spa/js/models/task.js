define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var TaskModel = Backbone.Model.extend({
    urlRoot: '/api/task/',
    validate: function(attrs, options) {
      if (attrs.end < attrs.start) {
        return "начало не может быть раньше конца";
      }
    }
  });
  return TaskModel;
});