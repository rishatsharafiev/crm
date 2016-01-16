define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/main/base.html',
  'models/auth/user',
  'jquery.cookie'
], function($, _, Backbone, indexTemplate, UserModel){
  var IndexView = Backbone.View.extend({
    el: $('#page'),

    template:  _.template( indexTemplate),

    render: function() {
      if(this.$el.data('page') != 'main') {
        var
          context = {},
          htmlText = this.template(context);

        this.$el.removeClass().addClass('hold-transition skin-blue sidebar-mini');
        this.$el.html(htmlText);
        this.$el.data('page', 'main');
      }

      return this.$el;
    }
  });

  return IndexView;
});