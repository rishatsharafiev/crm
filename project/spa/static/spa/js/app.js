define([
  'jquery',
  'underscore',
  'backbone',
  'router',
], function($, _, Backbone, Router){
  var initialize = function(){
    Router.initialize();
  }

  $.ajaxSetup({ cache: false });

  $( document ).on( 'click', 'a[href="#"]', function(e) {
      e.preventDefault();
      return false;
  });

  return {
    initialize: initialize
  };
});