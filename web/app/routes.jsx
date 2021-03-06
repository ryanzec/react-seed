import React from 'react';
import { createHistory } from 'history'
import {
  useRouterHistory,
  IndexRoute,
  Route,
  Router,
  applyRouterMiddleware
} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import store from './store/store';
import Application from './react/components/application.component.jsx';
import NotFoundPage from './react/components/not-found.page.jsx';
import DesktopPage from './pages/desktop/desktop.page.jsx';
import {routes as desktopRoutes} from './pages/desktop/module.jsx';
import {useScroll} from 'react-router-scroll';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/'
})

let history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route path="/" component={Application}>
        <IndexRoute component={DesktopPage} />
        {desktopRoutes}
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);
