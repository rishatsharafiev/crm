define([
  'underscore',
  'backbone',
  'models/employee',
  'backbone.paginator',
  'backgrid'
], function(_, Backbone, EmployeeModel){
  var EmployeeCollection = Backbone.PageableCollection.extend({
    model: EmployeeModel,
    mode: 'server',
    url: '/api/employee',

    resultsField: 'results',
    totalRecordsField: 'count',
    nextField: 'next',
    previousField: 'previous',

    state: {
      pageSize: 15,
    },

    queryParams: {
      currentPage:'page',
      pageSize: 'size',
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

  return EmployeeCollection;
});