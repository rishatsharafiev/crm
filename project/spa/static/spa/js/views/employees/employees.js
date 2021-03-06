define([
  'jquery',
  'underscore',
  'backbone',
  'moment',

  'views/main/box',
  'views/tags/box_header',

  'collections/employees_pageable',

  'backgrid',
  'backgrid-paginator',
  'backgrid-text-cell',
  'backgrid-moment-cell'
], function($, _, Backbone, moment, BoxView, BoxHeaderView, EmployeesCollection){
  var columns = [{
      name: "id",
      label: "#",
      cell: Backgrid.IntegerCell.extend({
        render: function(){
          var id = this.model.get("user")['id'];
          this.$el.empty();
          this.$el.append(id);
          return this;
        }
      }),
      sortable: true,
      editable: false
    }, {
        name: "login",
        label: "Логин",
        sortable: true,
        editable: false,
        cell: Backgrid.UriCell.extend({
          render: function(){
            var username = this.model.get("user")['username'];
            var employee_id = this.model.get('id');
            this.$el.empty();
            this.$el.append('<a href="#employees/'+employee_id+'">'+username+'</a>');
            return this;
          }
        })
     }, {
        name: "full_name",
        label: "Фамилия и Имя",
        cell: Backgrid.StringCell.extend({
          render: function(){
            var first_name = this.model.get("user")['first_name'];
            var last_name = this.model.get("user")['last_name'];
            this.$el.empty();
            this.$el.append( first_name + ' ' + last_name );
            return this;
          }
        }),
        sortable: true,
        editable: false,
     }, {
        name: "subdivision_name",
        label: "Подразделение",
        cell: Backgrid.StringCell.extend({
          render: function(){
            var subdivision_name = this.model.get("subdivision_name");
            this.$el.empty();
            this.$el.append( subdivision_name );
            return this;
          }
        }),
        sortable: true,
        editable: false,
     }, {
        name: "email",
        label: "E-mail",
        cell: Backgrid.EmailCell.extend({
          render: function(){
            var email = this.model.get("user")['email'];
            this.$el.empty();
            this.$el.append( email );
            return this;
          }
        }),
        sortable: true,
        editable: false,
     }, {
        name: "date_joined",
        label: "Дата вступления",
        sortable: true,
        editable: false,
        cell: Backgrid.StringCell.extend({
          render: function(){
            var date_joined = this.model.get("user")['date_joined'];
            this.$el.empty();
            this.$el.append( moment(date_joined).format("DD MMMM YYYY, HH:mm:ss") );
            return this;
          }
        })
     }];

  var EmployeesListView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this,'render');
      this.collection =  new EmployeesCollection();
      this.boxHeader = new BoxHeaderView({
        title: 'Сотрудники',
        url: '#employees/add',
        url_name: 'Добавить сотрудника'
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

  return EmployeesListView;
});