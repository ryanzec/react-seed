var React = require('react');
var reactRouter = require('react-router');
var applicationReact = require('./react/index');
var reactRedux = require('react-redux');
var reactRouterRedux = require('react-router-redux');
var store = require('./store/store');

var history = reactRouterRedux.syncHistoryWithStore(reactRouter.browserHistory, store);

var Application = applicationReact.components.Application;
var Desktop = require('./pages/desktop/desktop.component.jsx');
var IndexRoute = reactRouter.IndexRoute;
var NotFound = applicationReact.components.NotFound;
var Provider = reactRedux.Provider;
var Route = reactRouter.Route;
var Router = reactRouter.Router;

module.exports = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Application}>
        <IndexRoute component={Desktop} />
        {require('./pages/desktop/module.jsx').routes}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
);
