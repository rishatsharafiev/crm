var requirejs = require('requirejs');

var config = {
  baseUrl: 'js',
  out: 'script.min.js',
  name: 'main',
  paths: {
    'requirejs': 'libs/requirejs/require',
    'jquery': 'libs/jquery/dist/jquery.min',
    'underscore': 'libs/underscore-amd/underscore-min',
    'backbone': 'libs/backbone-amd/backbone-min',
    'text': 'libs/text/text'
  },
  include: ['requirejs']
};
requirejs.optimize( config, function(results) {
    console.log(results);
});