define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/main/box.html',
], function($, _, Backbone, boxTemplate){
  var IndexView = Backbone.View.extend({
    el: '#box',

    template:  _.template( boxTemplate ),

    render: function(options) {
      this.$el.html( this.template( {} ) );
      if(options.context.header) this.$el.find('.box-header').html(options.context.header);
      if(options.context.body) this.$el.find('.box-body').html(options.context.body);
      if(options.context.footer) this.$el.find('.box-footer').html(options.context.footer);

      return this.$el;
    }
  });

  return IndexView;
});