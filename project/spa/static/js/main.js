require.config({
  waitSeconds: 0,
  paths: {
    'json':[/*'//cdnjs.cloudflare.com/ajax/libs/json3/3.2.6/json3.min', '//cdnjs.cloudflare.com/ajax/libs/json2/20150503/json2.min',*/ 'libs/json2/json2' ],
    'jquery': [/*'//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min', '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',*/ 'libs/jquery/dist/jquery.min'],
    'underscore': [/*'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min', */ 'libs/underscore/underscore-min'],
    'backbone': [/*'//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min', */ 'libs/backbone/backbone-min'],
    'text': [/* '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',*/ 'libs/text/text'],
    'bootstrap': [/* '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min',*/ 'libs/bootstrap/dist/js/bootstrap.min'],
    'jquery_cookie': '//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min'
  },
  shim: {
    json: {
        exports: 'JSON'
    },
    backbone: {
        deps: ["underscore", "jquery", "json"],
        exports: "Backbone"
    },
    underscore: {
        exports: '_'
    },
    text: {
        exports: 'text'
    },
    jquery_cookie: {
      deps: ["jquery"]
    }
  }
});

require([
  'app',
], function(App){
  App.initialize();
});

require([
  'jquery',
  'bootstrap'
], function($){
  $('#carousel-example-generic').carousel();
});
