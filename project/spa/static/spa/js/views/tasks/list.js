define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tasks/list.html',
  'collections/tasks',
  'jquery.cookie'
], function($, _, Backbone, listTemplate, TaskCollection){

  // var TaskListView = Backbone.View.extend({
  //   el: $('#left-content'),

  //   template:  _.template( listTemplate),

  //   initialize: function() {
  //     var tasks = this.collection;
  //     tasks.on('add', this.addOne, this);
  //     tasks.on('reset', this.addAll, this);
  //     tasks.on('all', this.render, this);
  //   },

  //   addAll: function () {
  //     this.collection.each( this.addOne );
  //   },

  //   addOne: function (item) {
  //     var view = new
  //   }

  //   render: function() {
  //     var
  //         context = {
  //         },
  //         htmlText = this.template(context);
  //     this.collection = new TaskCollection();
  //     this.collection.fetch({reset: true});

  //     this.$el.html(htmlText);

  //     return this.$el;
  //   }
  // });
  var grid = new Backgrid.Grid({
    columns: [{
      name: "id",
      cell: Backgrid.IntegerCell.extend({ orderSeparator: '' }),
      sortable: false,
      editable: false
    }, {
       name: "title",
       cell: "string",
       sortable: false,
       editable: false
     }, {
       name: "text",
       cell: "text",
       sortable: false
     }, {
       name: "created_date",
       cell: "text"
     }, {
       name: "priority",
       cell: "text"
     }, {
       name: "created_date",
       cell: "text"
     }],
    collection: issues
  });
  var paginator = new Backgrid.Extension.Paginator({
    collection: issues
  });


  var TaskListView

  return TaskListView;
});