define([
  'underscore',
  'backbone',
  'models/project'
], function(_, Backbone, ProjectModel){
  var ProjectCollection = Backbone.Collection.extend({
      model: ProjectModel,
      url: '/api/project',
      parse: function(response) {
        return response.results;
      }
  });

  return ProjectCollection;
});