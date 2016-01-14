define([
  'jquery',
  'underscore',
  'backbone',
  'collections/users',
  'text!templates/users/list.html'
], function($, _, Backbone, UsersCollection, usersListTemplate){
  var UserListView = Backbone.View.extend({
    el: $("#container"),
    template:  _.template( usersListTemplate),
    initialize: function(){
      this.collection = new UsersCollection();
      this.collection.fetch({dataType: 'jsonp', reset: true});
      this.listenTo( this.collection, 'reset', this.render);
    },
    render: function() {
      var
        context = { users: this.collection.models },
        htmlText = this.template(context);

      this.$el.html(htmlText);
      return this.$el;
    }
  });

  return UserListView;
});