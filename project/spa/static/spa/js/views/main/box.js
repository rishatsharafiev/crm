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
      if(options.el, options.context) {
        this.el = options.el;
        var context = {
          title: options.context.title
        }
        this.$el.html( this.template( context ) );
        if(options.context.body) this.$el.find('.box-body').html(options.context.body);
        if(options.context.footer) this.$el.find('.box-footer').html(options.context.footer);
      }

      return this.$el;
    }
  });

  return IndexView;
});