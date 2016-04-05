define([
  'underscore',
  'backbone',
  'models/employee'
], function(_, Backbone, EmployeeModel){
  var EmployeeCollection = Backbone.Collection.extend({
      model: EmployeeModel,
      url: '/api/employee',
      parse: function(response) {
        return response.results;
      }
  });

  return EmployeeCollection;
});