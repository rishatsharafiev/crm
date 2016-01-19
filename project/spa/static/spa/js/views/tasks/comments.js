define([
  'jquery',
  'underscore',
  'backbone',
  'moment',

  'views/tasks/comment',
  'collections/comments',
  'models/comment'
  // 'jquery.cookie'
], function($,
  _,
  Backbone,
  moment,
  CommentItemView,
  CommentsCollection,
  CommentModel
){

  var CommentListView = Backbone.View.extend({
    className: 'comments',

    initialize: function(options){
        this.options = options;
        this.collection = new CommentsCollection();
        this.collection.on('sync',this.render,this);
        this.collection.fetch();
    },

    render: function() {
         _.each(this.collection.models,function( item ){
            this.$el.append(new CommentItemView({model:item}).render().el);
        },this);
        return this;
    }

    // events: {
    //     'click .add' : 'add',
    // },

    // add: function(){
    //     var text = this.$('#task_text').text();
    //     var task = this.$el.closest('#box').find('#task').data('task-id');

    //     this.model.save({patch:true});
    //     var comment = new CommentModel({
    //       'text': text,
    //       'task': task
    //     });
    //     comment.save({
    //       success: function(resp) {
    //         this.$el.prepend(new CommentItemView({model: resp}).render().el);
    //       }
    //     });
    // }
  });

  return CommentListView;
});