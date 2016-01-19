define([
  'jquery',
  'underscore',
  'backbone',

  'views/tags/option_priority',
  'collections/projects'
], function($, _, Backbone, ItemView, ProjectsCollection){
    var CollectionView = Backbone.View.extend({
        tagName: 'select',
        className: 'form-control',
        initialize:function(options){
            this.options = options;
            this.collection = new Backbone.Collection([
              {priority: 'Низкий', id: 0},
              {priority: 'Средний', id: 1},
              {priority: 'Высокий', id: 2}
            ]);
        },
        render:function(){
            _.each(this.collection.models,function( item ){
                this.$el.append(new ItemView({id: this.options.id, model:item}).render());
            },this);
            return this;
        }
    });

    return CollectionView;
});