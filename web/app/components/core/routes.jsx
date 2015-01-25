var React = require('react/addons');
var Application = require('./application.component.jsx');
var Desktop = require('../desktop/desktop.component.jsx');
var PreventDoubleClick = require('../desktop/prevent-double-click.component.jsx');
var WithResolves = require('../desktop/with-resolves.component.jsx');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var NotFound = React.createClass({
  render: function () {
    /* jshint ignore:start */
    return <h2>Not Found</h2>;
    /* jshint ignore:end */
  }
});

/* jshint ignore:start */
module.exports = (
  <Route handler={Application}>
    <DefaultRoute handler={Desktop} />
    <Route path="/desktop" handler={Desktop} />
    <Route path="/prevent-double-click" handler={PreventDoubleClick} />
    <Route path="/with-resolves" handler={WithResolves} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);
/* jshint ignore:end */
