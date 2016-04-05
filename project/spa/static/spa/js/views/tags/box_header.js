define([
  'jquery',
  'underscore',
  'backbone',

  'text!templates/tags/box_header.html',

], function($, _, Backbone, boxTemplate ){
  var ItemView = Backbone.View.extend({

      template: _.template( boxTemplate ),

      initialize:function(options){
          this.options = options;
      },

      render:function(){
        return this.template({ options: this.options });
      }
  });

  return ItemView;
});