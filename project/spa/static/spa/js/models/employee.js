define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var EmployeeModel = Backbone.Model.extend({
    urlRoot: '/api/employee'
  });
  return EmployeeModel;
});