define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/auth/login.html',
  'models/auth/user',
  'jquery.cookie'
], function($, _, Backbone, loginTemplate, UserModel){

  var LoginView = Backbone.View.extend({
    el: $('#page'),

    template:  _.template( loginTemplate),

    events: {
      'click #login-submit': 'action'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.addClass('hold-transition login-page');

      var
        context = {},
        htmlText = this.template(context);

      this.$el.html(htmlText);
      return this.$el;
    },

    action: function (e) {
      e.preventDefault();
      var user = new UserModel({
        username: this.$el.find('#username').val(),
        password: this.$el.find('#password').val()
      });
      user.save(null, {
          success: function(model, response) {
            console.log('login success! ');
            $.cookie('access_token', response.token);
            Backbone.navigate('');
          },
          error: function(model, response) {
              console.log('login error! ');
          }
      });
    }
  });

  return LoginView;
});





