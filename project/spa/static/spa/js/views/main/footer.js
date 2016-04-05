define(function(require){
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var Template = require('text!templates/main/footer.html');

  var View = Backbone.View.extend({

    template:  _.template( Template ),

    initialize: function (options) {
      this.el = options.el;
      this.data = options.data;
      this.render();
    },

    render: function() {
      this.template(this.data);
      return this.$el;
    }
  });

  return View;

});