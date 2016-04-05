define(function(require){
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var containerTemplate = require('text!templates/main/container.html');
  var HeaderView = require('views/main/box');

  var ContainerView = Backbone.View.extend({

    template:  _.template( containerTemplate ),

    initialize: function () {
      _.bind(this.render, this);
    },

    render: function(options) {
      this.$el = $(options.el);
      var self = this;
      var data = options.data;
      require([ options.views.header ], function( header ) {
        var HeaderView = header;
        require([ options.views.body ], function( body ) {
          var BodyView = body;
          require([ options.views.footer ], function( footer ) {
            var FooterView = footer;

            // subviews
            self.$el.html(self.template());
            self.header = new HeaderView({ el: self.$(".box-header"), data: data.header });
            self.body = new BodyView({ el: self.$(".box-body"), data: data.body });
            self.footer = new FooterView({ el: self.$(".box-footer"), data: data.footer });
            self.trigger('rendered');
          });
        });
      });

      return this.$el;
    }
  });

  return ContainerView;

});