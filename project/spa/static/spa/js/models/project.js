define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ProjectModel = Backbone.Model.extend({
    urlRoot: '/api/project'
  });
  return ProjectModel;
});