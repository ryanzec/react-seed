var React = require('react/addons');
var Application = require('./application.component.jsx');
var Desktop = require('../desktop/desktop.component.jsx');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var NotFound = require('./not-found.component.jsx');

module.exports = (
  <Route handler={Application}>
    <DefaultRoute handler={Desktop} />
    {require('../desktop/module.jsx').routes}
    <NotFoundRoute handler={NotFound} />
  </Route>
);
