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
  render: function notFoundComponentRender() {
    return <h2>Not Found</h2>;
  }
});
module.exports = (
  <Route handler={Application}>
    <DefaultRoute handler={Desktop} />
    {require('../desktop/module.jsx').routes}
    <NotFoundRoute handler={NotFound} />
  </Route>
);
