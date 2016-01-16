define([
  'underscore',
  'backbone',
  'models/task',
  'backbone.paginator',
  'backgrid'
], function(_, Backbone, TaskModel){
  // var TaskCollection = Backbone.Collection.extend({
  //     model: TaskModel,
  //     url: '/api/task/',
  //     parse: function(response) {
  //       return response.results;
  //     }
  // });
  var TaskCollection = Backbone.PageableCollection.extend({
    url: '/api/task/',
    state: {
      pageSize: 30
    },
    queryParams: {
      totalPages: null,
      totalRecords: null,
    },
    parseState: function (response, queryParams, state, options) {
      return {totalRecords: response.count};
    },
    parseRecords: function (response, options) {
      return response.results;
    }
  });


  return TaskCollection;
});