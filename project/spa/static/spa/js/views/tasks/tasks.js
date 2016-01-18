define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',

  'text!templates/tasks/tasks.html',
  'collections/tasks',

  'backgrid',
  'backgrid-paginator',
  'backgrid-text-cell',
  'backgrid-moment-cell'
], function($, _, Backbone, BoxView, listTemplate, TaskCollection){
  var columns = [{
      name: "id",
      label: "#",
      cell: Backgrid.IntegerCell.extend({ orderSeparator: '' }),
      sortable: false,
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
      sortable: false,
      editable: false
     }, {
      name: "base_task",
      label: "Базовая задача",
      cell: Backgrid.UriCell.extend({
        render: function(){
          var base_task = this.model.get("base_task");
          this.$el.empty();
          if(base_task) {
            this.$el.append('<a href="#tasks/'+base_task['id']+'">'+base_task['title']+'</a>');
          } else {
            this.$el.append('-');
          }
          return this;
        }
      }),
      sortable: false,
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
        sortable: false,
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
        sortable: false,
        editable: false,
     },
     {
        name: "project_title",
        label: "Проект",
        sortable: false,
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
          title: 'Задачи',
          body: grid.render().$el,
          footer: paginator.render().$el
        }
      });

      this.collection.fetch({reset: true});
      return this;
    }
  })

  return TaskListView;
});