define([
  'jquery',
  'underscore',
  'backbone',

  'views/main/box',
  'views/tags/box_header',

  'collections/projects_pageable',

  'backgrid',
  'backgrid-paginator',
  'backgrid-text-cell',
  'backgrid-moment-cell'
], function($, _, Backbone, BoxView, BoxHeaderView, ProjectsCollection){
  var columns = [{
      name: "id",
      label: "#",
      cell: Backgrid.IntegerCell.extend({ orderSeparator: '' }),
      sortable: true,
      editable: false
    }, {
        name: "title",
        label: "Проект",
        sortable: true,
        editable: false,
        cell: Backgrid.UriCell.extend({
          render: function(){
            var project_title = this.model.get("title");
            var project = this.model.get("id");
            this.$el.empty();
            this.$el.append('<a href="#projects/'+project+'">'+project_title+'</a>');
            return this;
          }
        })
     }, {
        name: "owner_name",
        label: "Владелец",
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
     },{
        name: "task_count",
        label: "Задач",
        cell: Backgrid.StringCell.extend({
          render: function(){
            var task_count = this.model.get("task_count");
            this.$el.empty();
            this.$el.append(task_count);
            return this;
          }
        }),
        sortable: true,
        editable: false,
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

  var ProjectsListView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this,'render');
      this.collection =  new ProjectsCollection();
      this.boxHeader = new BoxHeaderView({
        title: 'Проекты',
        url: '#projects/add',
        url_name: 'Добавить проект'
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
          header: this.boxHeader.render(),
          body: grid.render().$el,
          footer: paginator.render().$el
        }
      });

      this.collection.fetch({reset: true});
      return this;
    }
  })

  return ProjectsListView;
});