define([
  'jquery',
  'underscore',
  'backbone'
], function(){
  var UserModel = Backbone.Model.extend({
    defaults: {
      username: "",
      password: ""
    },
    url: function () {
      return '/api/login/';
    }
  });
  // Return the model for the module
  return UserModel;
});