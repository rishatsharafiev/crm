define([
  'underscore',
  'backbone',
  'models/users'
], function(_, Backbone, UserModel){
  var UserCollection = Backbone.Collection.extend({
    model: UserModel,
    url: 'http://localhost:8000/api/employee/'
  });
  // You don't usually return a collection instantiated
  return UserCollection;
});