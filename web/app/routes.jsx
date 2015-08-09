var React = require('react/addons');
var applicationReact = require('./react/index');
var Application = applicationReact.components.Application;
var Desktop = require('./pages/desktop/desktop.component.jsx');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var NotFound = applicationReact.components.NotFound;

module.exports = (
  <Route handler={Application}>
    <DefaultRoute handler={Desktop} />
    {require('./pages/desktop/module.jsx').routes}
    <NotFoundRoute handler={NotFound} />
  </Route>
);
