define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/auth/login.html',
  'jquery_cookie'
], function($, _, Backbone, loginTemplate){
  $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };

  function authorize(e) {
    e.preventDefault();
    var $auth_form = $('#auth-form');

    console.log($auth_form.serializeObject());
    $.ajax({
      dataType: "jsonp",
      type: $auth_form.attr('method'),
      url: $auth_form.attr('action'),
      data: $auth_form.serializeObject(),
      success: function(response){
          $.cookie('auth-token', response.token);
      }
    });
  }

  function data() {
    $.ajax({
      type: "GET",
      url: "/jwt_auth/restricted/",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "JWT " + $.cookie('auth-token') );
      },
      success: function(data){
        console.log(data);
      }
    });
  }

  $(document).ready(function(){
    $('#auth-form').on('click', 'input[type="submit"]', authorize);
    $('#get-data').on('click', data);
  });
  var LoginView = Backbone.View.extend({
    el: $("#login"),
    template:  _.template( loginTemplate),
    initialize: function(){

    },
    render: function() {
      var
        context = { action: 'http://localhost:8000/api/login/' },
        htmlText = this.template(context);

      this.$el.html(htmlText);
      return this.$el;
    }
  });

  return LoginView;
});





