define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/tags/box_header',

  'text!templates/tasks/tasks.html',
  'collections/tasks_pageable',

  'backgrid',
  'backgrid-paginator',
  'backgrid-text-cell',
  'backgrid-moment-cell'
], function($, _, Backbone, BoxView, BoxHeaderView, listTemplate, TaskCollection){
  var columns = [{
      name: "id",
      label: "#",
      cell: Backgrid.IntegerCell.extend({ orderSeparator: '' }),
      sortable: true,
      editable: false
    }, {
      name: "title",
      label: "Задача",
      cell: Backgrid.UriCell.extend({
        render: function(){
          var id = this.model.get("id");
          var title = this.model.get("title");
          this.$el.empty();
          this.$el.append('<a href="#tasks/'+id+'">'+title+'</a>');
          return this;
        }
      }),
      sortable: true,
      editable: false
     }, {
      name: "base_task",
      label: "Базовая задача",
      cell: Backgrid.UriCell.extend({
        render: function(){
          var base_task = this.model.get("base_task");
          var base_task_name = this.model.get("base_task_name");
          this.$el.empty();
          if(base_task) {
            this.$el.append('<a href="#tasks/'+base_task+'">'+base_task_name+'</a>');
          } else {
            this.$el.append('-');
          }
          return this;
        }
      }),
      sortable: true,
      editable: false
     }, {
        name: "owner_name",
        label: "Постановщик",
        cell: Backgrid.UriCell.extend({
          render: function(){
            var owner_id = this.model.get("owner");
            var owner_name = this.model.get("owner_name");
            this.$el.empty();
            this.$el.append('<a href="#employees/'+owner_id+'">'+owner_name+'</a>');
            return this;
          }
        }),
        sortable: true,
        editable: false,
     }, {
        name: "responsible_name",
        label: "Ответственный",
        cell: Backgrid.UriCell.extend({
          render: function(){
            var responsible_id = this.model.get("responsible");
            var responsible_name = this.model.get("responsible_name");
            this.$el.empty();
            this.$el.append('<a href="#employees/'+responsible_id+'">'+responsible_name+'</a>');
            return this;
          }
        }),
        sortable: true,
        editable: false,
     },
     {
        name: "project_title",
        label: "Проект",
        sortable: true,
        editable: false,
        cell: Backgrid.UriCell.extend({
          render: function(){
            var project_title = this.model.get("project_name");
            var project = this.model.get("project");
            this.$el.empty();
            this.$el.append('<a href="#projects/'+project+'">'+project_title+'</a>');
            return this;
          }
        }),
     },
     {
        name: "status",
        label: "Статус",
        sortable: true,
        editable: false,
        cell: Backgrid.StringCell.extend({
          render: function(){
            var status_choices = ['Новый', 'В процессе', 'Завершено', 'Проверено'];
            var status = this.model.get("status");
            var status_text = status_choices[status ] || '-';
            this.$el.empty();
            this.$el.append('<span>' + status_text +'</span>');
            return this;
          }
        }),
     },
     {
        name: "priority",
        label: "Приоритет",
        sortable: true,
        editable: false,
        cell: Backgrid.StringCell.extend({
          render: function(){
            var priority_choices = ['Низкий', 'Средний', 'Высокий'];
            var priority = this.model.get("priority");
            var priority_text = priority_choices[priority ] || '-';
            this.$el.empty();
            this.$el.append('<span>' + priority_text +'</span>');
            return this;
          }
        }),
     }, {
        name: "created_date",
        label: "Дата создания",
        sortable: true,
        editable: false,
        cell: Backgrid.Extension.MomentCell.extend({
          modelFormat: "YYYY-M-DTHH:mm:ss.SSSZ",
          displayLang: "ru",
          displayFormat: "DD MMMM YYYY, HH:mm:ss"
        })
     }];

  var TaskListView = Backbone.View.extend({

    template:  _.template( listTemplate ),

    initialize: function() {
      _.bindAll(this,'render');
      this.collection =  new TaskCollection();

      this.task_header = new BoxHeaderView({
        title: 'Задачи',
        url: '#tasks/add',
        url_name: 'Добавить задачу'
      });
    },

    render: function() {
      var grid = new Backgrid.Grid({
        columns: columns,
        collection: this.collection
      });

      var paginator = new Backgrid.Extension.Paginator({
        collection: this.collection
      });



      var boxView = new BoxView();

      boxView.render({
        el: '#box',
        context: {
          header: this.task_header.render(),
          body: grid.render().$el,
          footer: paginator.render().$el
        }
      });

      console.log(this.task_header.render())

      this.collection.fetch({reset: true});
      return this;
    }
  })

  return TaskListView;
});