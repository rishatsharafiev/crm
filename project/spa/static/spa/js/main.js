require.config({
  waitSeconds: 0,
  urlArgs: 'bust=' + (new Date()).getTime(),
  paths: {
    'json':[/*'//cdnjs.cloudflare.com/ajax/libs/json3/3.2.6/json3.min', '//cdnjs.cloudflare.com/ajax/libs/json2/20150503/json2.min',*/ 'libs/json2/json2' ],
    'underscore': [/*'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min', */ 'libs/underscore/underscore-min'],
    'backbone-raw': [/*'//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min', */ 'libs/backbone/backbone-min'],
    'backbone': 'extend/backbone',
    'backbone.sync': 'extend/backbone.sync',
    'text': [/* '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',*/ 'libs/text/text'],

    'jquery': [/*'//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min', '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',*/ 'libs/jquery/dist/jquery.min'],
    'bootstrap': [/* '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min',*/ 'libs/bootstrap/dist/js/bootstrap.min'],
    'jquery.cookie': [/*'//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',*/ 'libs/jquery.cookie/jquery.cookie'],
    'jquery.sparkline': 'libs/AdminLTE/plugins/sparkline/jquery.sparkline.min',
    'jvectormap': 'libs/AdminLTE/plugins/jvectormap/jquery-jvectormap-1.2.2.min',
    'jvectormap-world': 'libs/AdminLTE/plugins/jvectormap/jquery-jvectormap-world-mill-en',
    'slimscroll': 'libs/AdminLTE/plugins/slimScroll/jquery.slimscroll.min',
    'icheck': 'libs/AdminLTE/plugins/iCheck/icheck.min',
    'fastclick': 'libs/AdminLTE/plugins/fastclick/fastclick',
    'chartjs': 'libs/AdminLTE/plugins/chartjs/Chart.min',

    'adminlte-raw': 'libs/AdminLTE/dist/js/app',
    'adminlte': 'extend/adminlte'
  },
  shim: {
    'json': {
        exports: 'JSON'
    },
    'backbone': {
        deps: ['underscore', 'jquery', 'json'],
        exports: "Backbone"
    },
    'underscore': {
        exports: '_'
    },
    'text': {
        exports: 'text'
    },
    /* jquery plugins */
    'bootstrap': {
        deps: ['jquery']
    },
    'jquery.cookie': {
        deps: ['jquery']
    },
    'jquery.sparkline': {
        deps: ['jquery']
    },
    'jvectormap': {
        deps: ['jquery']
    },
    'jvectormap-world': {
        deps: ['jquery']
    },
    'slimscroll': {
        deps: ['jquery']
    },
    'icheck': {
        deps: ['jquery']
    },
    'fastclick': {
        deps: ['jquery']
    },
    'chartjs': {
        deps: ['jquery']
    },
  }
});

require([
  'app',
  'backbone',
  'adminlte'
], function(App, Backbone){
  App.initialize();
});
