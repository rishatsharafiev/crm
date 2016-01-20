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

    initialize: function(options){
        this.options = options;
        this.collection = new CommentsCollection();
        this.collection.on('sync',this.render, this);
        this.collection.fetch({
          data: { task: this.options.task_id }
        });
        $('#comment_edit').on('click', this.add) ;
    },

    render:function(){
        _.each(this.collection.models,function( item ){
            this.options.el.after( new CommentItemView({ model: item }).render() );
        },this);

        return this;
    },

    add: function(e){
        e.preventDefault();
        var self = this;

        var comment_textarea = $('#comment_textarea');
        var task = $('#box').find('#task').data('task-id');

        if(comment_textarea.val() == '' ) return;

        var comment = new CommentModel();

        comment.save({
          'text': comment_textarea.val(),
          'task': task
        }, {
          success: function(model, response) {
            comment_textarea.val('');
            $('.comments_list').find('.comment-add').after(new CommentItemView({model: model}).render());
          }
        });
    }
  });

  return CommentListView;
});