define([
  'jquery',
  'underscore',
  'backbone',

  'text!templates/tags/option_priority.html',

], function($, _, Backbone, optionTemplate ){
  var ItemView = Backbone.View.extend({

      template: _.template( optionTemplate ),

      initialize:function(options){
          this.options = options;
      },

      render:function(){
        return this.template({ model: this.model.toJSON(), id: this.options.id });
      }
  });

  return ItemView;
});