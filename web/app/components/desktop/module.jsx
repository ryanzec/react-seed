var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;

var Desktop = require('./desktop.component.jsx');
var PreventDoubleClick = require('./prevent-double-click.component.jsx');
var WithResolves = require('./with-resolves.component.jsx');

module.exports = {
  routes: [
    <Route key="1" path="/desktop" handler={Desktop} />,
    <Route key="2" path="/prevent-double-click" handler={PreventDoubleClick} />,
    <Route key="3" path="/with-resolves" handler={WithResolves} />
  ]
}
