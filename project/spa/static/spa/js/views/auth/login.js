define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/auth/login.html',
  'models/auth/user',
  'jquery.cookie',
  'parsley'
], function($, _, Backbone, loginTemplate, UserModel){

  var LoginView = Backbone.View.extend({
    el: $('#page'),

    template:  _.template( loginTemplate),

    events: {
        'click #login-btn'                      : 'onLoginAttempt',
        // 'click #signup-btn'                     : 'onSignupAttempt',
        // 'keyup #login-password-input'           : 'onPasswordKeyup',
        // 'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
    },


    // onPasswordKeyup: function(evt){
    //     var k = evt.keyCode || evt.which;

    //     if (k == 13 && $('#login-password-input').val() === ''){
    //         evt.preventDefault();    // prevent enter-press submit when input is empty
    //     } else if(k == 13){
    //         evt.preventDefault();
    //         this.onLoginAttempt();
    //         return false;
    //     }
    // },


    // onConfirmPasswordKeyup: function(evt){
    //     var k = evt.keyCode || evt.which;

    //     if (k == 13 && $('#confirm-password-input').val() === ''){
    //         evt.preventDefault();   // prevent enter-press submit when input is empty
    //     } else if(k == 13){
    //         evt.preventDefault();
    //         this.onSignupAttempt();
    //         return false;
    //     }
    // },

    onLoginAttempt: function(evt){
        if(evt) evt.preventDefault();
        if(this.$("#login-form").parsley('validate')){
          var user = new UserModel({
            username: this.$el.find('#username').val(),
            password: this.$el.find('#password').val()
          });
          user.save(null, {
              success: function(model, response) {
                if(response.token && atob) {
                  var jwt = response.token.split('.');
                  var payload = JSON.parse(atob(jwt[1]));
                  $.cookie('user_id', payload.user_id, {'expire': 7});
                  $.cookie('access_token', response.token, {'expire': 7});
                  Backbone.navigate('');
                }
              },
              error: function(model, response) {
                this.$('#login-error').append(response);
              }
          });
        }
    },


    // onSignupAttempt: function(evt){
    //     if(evt) evt.preventDefault();
    //     if(this.$("#signup-form").parsley('validate')){
    //         app.session.signup({
    //             username: this.$("#signup-username-input").val(),
    //             password: this.$("#signup-password-input").val(),
    //             name: this.$("#signup-name-input").val()
    //         }, {
    //             success: function(mod, res){
    //                 if(DEBUG) console.log("SUCCESS", mod, res);

    //             },
    //             error: function(err){
    //                 if(DEBUG) console.log("ERROR", err);
    //                 app.showAlert('Uh oh!', err.error, 'alert-danger');
    //             }
    //         });
    //     } else {
    //         // Invalid clientside validations thru parsley
    //         if(DEBUG) console.log("Did not pass clientside validation");

    //     }
    // },

    // render:function () {
    //     if(app.session.get('logged_in')) this.template = _.template(LoggedInPageTpl);
    //     else this.template = _.template(LoginPageTpl);

    //     this.$el.html(this.template({ user: app.session.user.toJSON() }));
    //     return this;
    // }

    render: function() {
      this.$el.data('page','login');
      this.$el.removeClass().addClass('hold-transition login-page');
      var
        context = {},
        htmlText = this.template(context);

      this.$el.html(htmlText);
      return this.$el;
    }
  });

  return LoginView;
});





