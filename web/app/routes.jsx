import * as React from 'react';
import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import * as store from './store/store';
import {
  Application,
  NotFound
} from './react/components';
import Desktop from './pages/desktop/desktop.component.jsx';
import {routes as desktopRoutes} from './pages/desktop/module.jsx';

let history = syncHistoryWithStore(browserHistory, store);

module.exports = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Application}>
        <IndexRoute component={Desktop} />
        {desktopRoutes}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
);
