define([
  'jquery',
  'underscore',
  'backbone',
  'moment',

  'views/main/box',
  'views/tags/box_header',

  'collections/subdivisions_pageable',

  'backgrid',
  'backgrid-paginator',
  'backgrid-text-cell',
  'backgrid-moment-cell'
], function($, _, Backbone, moment, BoxView, BoxHeaderView, SubdivisionsCollection){
  var columns = [{
      name: "id",
      label: "#",
      cell: Backgrid.IntegerCell.extend({
        render: function(){
          var id = this.model.get('id');
          this.$el.empty();
          this.$el.append(id);
          return this;
        }
      }),
      sortable: true,
      editable: false
    }, {
        name: "title",
        label: "Подразделение",
        sortable: true,
        editable: false,
        cell: Backgrid.StringCell.extend({
          render: function(){
            var id = this.model.get("id");
            var title = this.model.get("title");
            this.$el.empty();
            this.$el.append('<a href="#subdivisions/'+id+'">'+title+'</a>');
            return this;
          }
        }),
     }, {
        name: "description",
        label: "Описание",
        cell: 'string',
        sortable: false,
        editable: false,
     }, {
        name: "manager",
        label: "Руководитель",
        cell: Backgrid.StringCell.extend({
          render: function(){
            var manager = this.model.get("manager");
            var manager_name = this.model.get("manager_name");
            this.$el.empty();
            this.$el.append('<a href="#employees/'+manager+'">'+manager_name+'</a>');
            return this;
          }
        }),
        sortable: true,
        editable: false,
     }];

  var SubdivisionsListView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this,'render');
      this.collection =  new SubdivisionsCollection();
      this.boxHeader = new BoxHeaderView({
        title: 'Подразделения',
        url: '#subdivisions/add',
        url_name: 'Добавить подразделение'
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
          header: this.boxHeader.render() ,
          body: grid.render().$el,
          footer: paginator.render().$el
        }
      });

      this.collection.fetch({reset: true});
      return this;
    }
  })

  return SubdivisionsListView;
});