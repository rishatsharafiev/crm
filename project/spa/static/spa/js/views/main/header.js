define(function(require){
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var Template = require('text!templates/main/header.html');

  var View = Backbone.View.extend({

    template:  _.template( Template ),

    initialize: function (options) {
      this.el = options.el;
      this.data = options.data;
      this.render();
    },

    render: function() {
      this.$el.html( this.template({ data: this.data }) );
      return this.$el;
    }
  });

  return View;

});