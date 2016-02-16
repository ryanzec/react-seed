var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Desktop = require('./desktop.component.jsx');
var PreventDoubleClick = require('./prevent-double-click.component.jsx');
var WithResolves = require('./with-resolves.component.jsx');
var WithParam = require('./with-param.component.jsx');

var withResolvesHooks = require('./with-resolves.hooks');
var desktopHooks = require('./desktop.hooks');

module.exports = {
  routes: [
    <Route
      key="1"
      name="desktop"
      path="/desktop"
      component={Desktop}
      onEnter={desktopHooks.onEnter}
    />,
    <Route
      key="2"
      name="prevent-double-click"
      path="/prevent-double-click"
      component={PreventDoubleClick}
    />,
    <Route
      key="3"
      name="with-resolves"
      path="/with-resolves"
      component={WithResolves}
      onEnter={withResolvesHooks.onEnter}
    />,
    <Route
      key="4"
      name="with-param"
      path="/with-param(/:p1)"
      component={WithParam}
    />
  ]
};
