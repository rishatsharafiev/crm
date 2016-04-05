define([
  'jquery',
  'underscore',
  'backbone',

  'views/tags/option_status',
  'collections/projects'
], function($, _, Backbone, ItemView, ProjectsCollection){
    var CollectionView = Backbone.View.extend({
        tagName: 'select',
        className: 'form-control',
        initialize:function(options){
            this.options = options;
            this.collection = new Backbone.Collection([
              {status:  'Новый', id: 0},
              {status: 'В процессе', id: 1},
              {status: 'Завершено', id: 2},
              {status: 'Проверено', id: 3}
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