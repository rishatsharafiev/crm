define([
  'jquery',
  'underscore',
  'backbone',

  'views/tags/option_base_task',
  'collections/tasks_pageable'
], function($, _, Backbone, ItemView, TasksCollection){
    var CollectionView = Backbone.View.extend({
        tagName: 'select',
        className: 'form-control',
        initialize:function(options){
            this.options = options;
            this.collection = new TasksCollection();
            this.collection.on('sync',this.render,this);
            this.collection.fetch();
        },
        render:function(){
            this.$el.html('');
            this.$el.append('<option value="null">---</option>');
            _.each(this.collection.models,function( item ){
                this.$el.append(new ItemView({id: this.options.id, model:item}).render());
            },this);
            return this;
        }
    });

    return CollectionView;
});