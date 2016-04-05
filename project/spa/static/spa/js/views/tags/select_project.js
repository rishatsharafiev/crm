define([
  'jquery',
  'underscore',
  'backbone',

  'views/tags/option_project',
  'collections/projects'
], function($, _, Backbone, ItemView, ProjectsCollection){
    var CollectionView = Backbone.View.extend({
        tagName: 'select',
        className: 'form-control',
        initialize:function(options){
            this.options = options;
            this.collection = new ProjectsCollection();
            this.collection.on('sync',this.render,this);
            this.collection.fetch();
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