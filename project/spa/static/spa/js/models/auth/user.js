define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var UserModel = Backbone.Model.extend({
    defaults: {
      username: "",
      password: ""
    },
    url: '/api/login/'
  });
  // Return the model for the module
  return UserModel;
});