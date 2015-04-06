var React = require('react/addons');
var Router = require('react-router');

Router.run(require('./routes.jsx'), Router.HistoryLocation, function routerRun(Handler, routerState) {
  React.render(<Handler routerState={routerState} />, document.body);
});
