require.config({
  baseUrl: '/static/spa/js/',
  waitSeconds: 0,
  urlArgs: 'bust=' + (new Date()).getTime(),
  paths: {
    'json':[/*'//cdnjs.cloudflare.com/ajax/libs/json3/3.2.6/json3.min', '//cdnjs.cloudflare.com/ajax/libs/json2/20150503/json2.min',*/ 'libs/json2/json2' ],
    'underscore': [/*'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min', */ 'libs/underscore/underscore-min'],
    'backbone-raw': [/*'//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min', */ 'libs/backbone/backbone-min'],
    'backbone': 'extend/backbone',
    'backbone.sync': 'extend/backbone.sync',
    'text': [/* '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',*/ 'libs/text/text'],
    'backbone.paginator': 'libs/backbone.paginator/lib/backbone.paginator.min',
    'backgrid': 'libs/backgrid/lib/backgrid.min',
    'backgrid-paginator': 'libs/backgrid-paginator/backgrid-paginator',
    'backgrid-text-cell': 'libs/backgrid-text-cell/backgrid-text-cell.min',
    'backgrid-moment-cell': 'libs/backgrid-moment-cell/backgrid-moment-cell',

    'moment': 'libs/moment/moment',
    'parsley': 'libs/parsleyjs/dist/parsley.min',

    'jquery': [/*'//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min', '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',*/ 'libs/jquery/dist/jquery.min'],
    'bootstrap': [/* '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min',*/ 'libs/bootstrap/dist/js/bootstrap.min'],
    'jquery.cookie': [/*'//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',*/ 'libs/jquery.cookie/jquery.cookie'],
    'jquery.sparkline': 'libs/AdminLTE/plugins/sparkline/jquery.sparkline.min',
    'slimscroll': 'libs/AdminLTE/plugins/slimScroll/jquery.slimscroll.min',
    'icheck': 'libs/AdminLTE/plugins/iCheck/icheck.min',
    'fastclick': 'libs/AdminLTE/plugins/fastclick/fastclick',
    'chartjs': 'libs/AdminLTE/plugins/chartjs/Chart.min',

    'adminlte-raw': 'libs/AdminLTE/dist/js/app',
    'adminlte': 'extend/adminlte',
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
    'backgrid': {
        deps: ['underscore', 'jquery', 'backbone']
    },
    'backgrid-paginator': {
        deps: ['backgrid']
    },
    'backgrid-text-cell': {
        deps: ['backgrid']
    },
    'backgrid-moment-cell': {
        deps: ['backgrid', 'moment']
    },
    'backbone.paginator': {
        deps: ['underscore', 'backbone'],
        exports: 'Backbone.Paginator'
    },

    /* jquery plugins */
    'parsley': {
        deps: ['jquery']
    },
    'bootstrap': {
        deps: ['jquery']
    },
    'jquery.cookie': {
        deps: ['jquery']
    },
    'jquery.sparkline': {
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
    'adminlte-raw': {
        deps: [
            'jquery',
            'bootstrap',
            'jquery.sparkline',
            'slimscroll',
            'icheck',
            'fastclick',
            'chartjs',
        ]
    }
  }
});

require([
  'app',
  'adminlte'
], function(App){
    App.initialize();
});
