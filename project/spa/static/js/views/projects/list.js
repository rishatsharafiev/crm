define([
  'jquery',
  'underscore',
  'backbone',
  'collections/projects',
  'text!templates/projects/list.html'
], function($, _, Backbone, ProjectsCollection, projectsListTemplate){
  var ProjectListView = Backbone.View.extend({
    el: $("#container"),
    template:  _.template( projectsListTemplate),
    initialize: function(){
      this.collection = new ProjectsCollection();
      this.collection.add({ name: "Ginger Kid"});
      this.collection.add({ name: "Alex Rough"});
      this.collection.add({ name: "Kinder Pool"});
      this.collection.add({ name: "JamesOliver Queen"});
    },
    render: function() {
      var
        context = { projects: this.collection.models },
        htmlText = this.template(context);

      this.$el.html(htmlText);
      return this.$el;
    }
  });

  return ProjectListView;
});