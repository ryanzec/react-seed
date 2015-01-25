var React = require('react/addons');
var Router = require('react-router');

Router.run(require('./routes.jsx'), Router.HistoryLocation, function (Handler) {
  /* jshint ignore:start */
  React.render(<Handler/>, document.body);
  /* jshint ignore:end */
});
