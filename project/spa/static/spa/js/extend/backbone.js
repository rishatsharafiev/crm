define([
  'jquery',
  'underscore',
  'backbone-raw',
  'jquery.cookie'
], function($, _, Backbone){
  /* sync overrride */
  var _sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {

    if( model && (method === 'create' || method === 'update' || method === 'patch') ) {
        options.contentType = 'application/json';
        options.data = JSON.stringify(options.attrs || model.toJSON());
    }

    options.beforeSend =function(xhr) {
      xhr.setRequestHeader('Authorization' , 'JWT ' + $.cookie('access_token'))
    }

    return _sync.call( this, method, model, options );
  };

  /* router before, after methods */
  Backbone.Router.prototype.before = function () {};
  Backbone.Router.prototype.after = function () {};

  Backbone.Router.prototype.route = function (route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) callback = this[name];

    var router = this;

    Backbone.history.route(route, function(fragment) {
      var args = router._extractParameters(route, fragment);

      router.before.apply(router, arguments);
      callback && callback.apply(router, args);
      router.after.apply(router, arguments);

      router.trigger.apply(router, ['route:' + name].concat(args));
      router.trigger('route', name, args);
      Backbone.history.trigger('route', router, name, args);
    });
    return this;
  };

  return Backbone;
});