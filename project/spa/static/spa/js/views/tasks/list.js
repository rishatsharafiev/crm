define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tasks/list.html',
  'text!templates/tasks/list_box.html',
  'collections/tasks',
  'jquery.cookie',
  'backgrid',
  'backgrid-paginator',
  'backgrid-text-cell',
  'backgrid-moment-cell'
], function($, _, Backbone, listTemplate, listBoxTemplate, TaskCollection){
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
        sortable: false,
        editable: false,
        cell: Backgrid.Extension.MomentCell.extend({
          modelFormat: "YYYY-M-DTHH:mm:ss.SSSZ",
          // You can specify the locales of the model and display formats too
          displayLang: "ru-ru",
          displayFormat: "YYYY-MMM-DD HH:mm:ss"
        })
     }];

  var TaskBoxView = Backbone.View.extend({
    el: '#left-content',
    template:  _.template( listBoxTemplate),
    render: function() {
      this.$el.html(this.template({}));
    }
  });

  var TaskListView = Backbone.View.extend({
    el: '#left-content',

    template:  _.template( listTemplate),

    initialize: function() {
      _.bindAll(this,'render');
      this.collection =  new TaskCollection();
      var taskBoxView = new TaskBoxView();
      taskBoxView.render();
    },

    render: function() {
      var grid = new Backgrid.Grid({
        columns: columns,
        collection: this.collection
      });

      var paginator = new Backgrid.Extension.Paginator({
        collection: this.collection
      });

      console.log(this.$el.find('#tasks-table'));
      this.$el.find('#tasks-table').append(grid.render().$el);
      this.$el.find('#tasks-pagination').append(paginator.render().$el);
      this.collection.fetch({reset: true});
      return this;
    }
  })

  return TaskListView;
});