define([
  'underscore',
  'backbone',
  'models/project',
  'backbone.paginator',
  'backgrid'
], function(_, Backbone, ProjectModel){
  // var TaskCollection = Backbone.Collection.extend({
  //     model: TaskModel,
  //     url: '/api/task/',
  //     parse: function(response) {
  //       return response.results;
  //     }
  // });
  var ProjectCollection = Backbone.PageableCollection.extend({
    model: ProjectModel,
    mode: 'server',
    url: '/api/project',

    resultsField: 'results',
    totalRecordsField: 'count',
    nextField: 'next',
    previousField: 'previous',

    state: {
      pageSize: 15,
      order: -1
    },

    queryParams: {
      currentPage:'page',
      pageSize: 'size',
      order: "ordering",
      directions: {
        "-1": "created_date",
        "1": "created_date"
      }
    },

    parseState: function (resp, queryParams, state, options) {
      return {totalRecords: resp[this.totalRecordsField]};
    },

    parseLinks: function(resp, options) {
      return {
        prev: resp[this.previousField],
        next: resp[this.nextField],
        first: null
      }
    },

    parseRecords: function (resp, options) {
      if( resp && _.has(resp, this.resultsField) && _.isArray(resp[this.resultsField]) ) {
        return resp.results;
      } else {
        return Backbone.PageableCollection.prototype.parseRecords.apply(this, arguments);
      }
    },

    hasPrevious: function() {
      return this.hasPreviousPage();
    },

    hasNext: function() {
      return this.hasNextPage();
    }
  });

  return ProjectCollection;
});