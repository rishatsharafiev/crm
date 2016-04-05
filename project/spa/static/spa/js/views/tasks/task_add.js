define([
  'jquery',
  'underscore',
  'backbone',

  'views/tags/select_project',
  'views/tags/select_employee',
  'views/tags/select_priority',
  'views/tags/select_status',
  'views/tags/select_base_task',

  'text!templates/tasks/task_add.html',
  'models/task',
  // 'jquery.cookie'
], function($,
  _,
  Backbone,
  SelectProjectView,
  SelectEmployeeView,
  SelectPriorityView,
  SelectStatusView,
  SelectBaseTask,
  taskTemplate,
  TaskModel){

  var TaskView = Backbone.View.extend({
    className: 'task',

    template:  _.template( taskTemplate ),

    initialize: function(options){

    },

    render: function() {
        this.$el.html(this.template({  }));
        this.$('#error').hide();
        this.$('#error_text').html('');
        this.renderProjects();
        this.renderBaseTasks();
        this.renderResponsibles();
        this.renderPriority();
        this.renderStatus();
        return this.$el;
    },

    events: {
      'click .add':'add'
    },

    renderProjects: function () {
        var select = new SelectProjectView({});
        this.$('#project_list').html( select.render().el );
    },

    renderBaseTasks: function () {
        var select = new SelectBaseTask({});
        this.$('#base_task_list').html( select.render().el );
    },

    renderResponsibles: function () {
        var select = new SelectEmployeeView({});
        this.$('#responsible_list').html( select.render().el );
    },

    renderPriority: function () {
        var select = new SelectPriorityView({id: 0});
        this.$('#priority_list').html( select.render().el );
    },

    renderStatus: function () {
        var select = new SelectStatusView({id: 0});
        this.$('#status_list').html( select.render().el );
    },

    add: function(e) {
        e.preventDefault();

        var title = this.$('#task_title').val();
        var text = this.$('#task_text').val();
        var project = this.$('#project_list').find('option:selected').val();
        var base_task = this.$('#base_task_list').find('option:selected').val();
        var priority = this.$('#priority_list').find('option:selected').val();
        var responsible = this.$('#responsible_list').find('option:selected').val();
        var status = this.$('#status_list').find('option:selected').val();

        if(!title || !text || !project || !priority || !responsible || !status) {
          this.$('#error').show();
          this.$('#error_text').html('Заполните все поля');
          return;
        }

        var taskObj = {
          'title': title,
          'text': text,
          'project': project,
          'priority': priority,
          'responsible': responsible,
          'status': status
        }

        if(base_task != 'null') {
          taskObj['base_task'] = base_task;
        }

        var model = new TaskModel(taskObj);
        model.save({}, {
          success: function() {
            Backbone.navigate('tasks', true);
          }
        });
    }
  })

  return TaskView;
});