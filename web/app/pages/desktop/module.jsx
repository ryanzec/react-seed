var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;

var Desktop = require('./desktop.component.jsx');
var PreventDoubleClick = require('./prevent-double-click.component.jsx');
var WithResolves = require('./with-resolves.component.jsx');
var WithParam = require('./with-param.component.jsx');

module.exports = {
  routes: [
    <Route key="1" name="desktop" path="/desktop" handler={Desktop} />,
    <Route key="2" name="prevent-double-click" path="/prevent-double-click" handler={PreventDoubleClick} />,
    <Route key="3" name="with-resolves" path="/with-resolves" handler={WithResolves} />,
    <Route key="4" name="with-param" path="/with-param/:p1?" handler={WithParam} />
  ]
};
