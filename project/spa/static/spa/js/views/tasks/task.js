define([
  'jquery',
  'underscore',
  'backbone',
  'moment',

  'views/tags/select_project',
  'views/tags/select_employee',
  'views/tags/select_priority',
  'views/tags/select_status',
  'views/tags/select_base_task',

  'text!templates/tasks/task.html',
  'models/task',

  'views/tasks/comments',
  // 'jquery.cookie'
], function($,
  _,
  Backbone,
  moment,
  SelectProjectView,
  SelectEmployeeView,
  SelectPriorityView,
  SelectStatusView,
  SelectBaseTask,
  taskTemplate,
  TaskModel,
  CommentsListView){

  var TaskView = Backbone.View.extend({
    className: 'task',

    template:  _.template( taskTemplate ),

    initialize: function(options){
        this.model = new TaskModel({id: options.id });
        this.model.fetch({reset: true});

        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.render);
    },

    render: function() {
        this.$el.html(this.template({ task: this.model.toJSON(), moment: moment }));
        this.renderProjects();
        this.renderBaseTasks();
        this.renderResponsibles();
        this.renderPriority();
        this.renderStatus();
        this.renderComments();
        return this.$el;
    },

    events: {
        'click .edit' : 'edit',
        'click .destroy': 'destroy'
    },

    renderProjects: function () {
        var select = new SelectProjectView({id: this.model.get('project')});
        this.$('#project_list').html( select.render().el );
    },

    renderBaseTasks: function () {
        var select = new SelectBaseTask({id: this.model.get('base_task')});
        this.$('#base_task_list').html( select.render().el );
    },

    renderResponsibles: function () {
        var select = new SelectEmployeeView({id: this.model.get('responsible')});
        this.$('#responsible_list').html( select.render().el );
    },

    renderPriority: function () {
        var select = new SelectPriorityView({id: this.model.get('priority')});
        this.$('#priority_list').html( select.render().el );
    },

    renderStatus: function () {
        var select = new SelectStatusView({id: this.model.get('status')});
        this.$('#status_list').html( select.render().el );
    },

    renderComments: function() {
        var comments = new CommentsListView({ el: $('.comments_list').find('.comment-add'), task_id: this.model.get('id') });
    },

    edit: function(){
        var title = this.$('#task_title').text();
        var text = this.$('#task_text').text();
        var project = this.$('#project_list').find('option:selected').val();
        var base_task = this.$('#base_task_list').find('option:selected').val();
        var priority = this.$('#priority_list').find('option:selected').val();
        var responsible = this.$('#responsible_list').find('option:selected').val();
        var status = this.$('#status_list').find('option:selected').val();

        if(status != 3 || this.model.get('owner') == $.cookie('user_id') ) {
          this.model.set('status', status);
        }

        if( this.model.get('status') == 3 || this.model.get('owner') != $.cookie('user_id') ) {
          this.model.set('owner', this.model.get('status'));
        }

        if(base_task != 'null') {
          this.model.set('base_task', base_task);
        } else {
          this.model.set("base_task", null);
        }

        this.model.set('title', title);
        this.model.set('text', text);
        this.model.set('project', project);
        this.model.set('priority', priority);
        this.model.set('responsible', responsible);
        this.model.save({patch:true});
    },

    destroy: function(){
        this.model.destroy({
          success: function() {
            Backbone.navigate('tasks', true);
          }
        });
    }
  })

  return TaskView;
});