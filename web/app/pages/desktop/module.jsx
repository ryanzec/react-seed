import React from 'react';
import {Route} from 'react-router';

import DesktopPage from './desktop.page.jsx';
import PreventDoubleClickPage from './prevent-double-click.page.jsx';
import WithResolvesPage from './with-resolves.page.jsx';
import WithParamPage from './with-param.page.jsx';

import {
  desktop as desktopHooks,
  withResolves as withResolvesHooks
} from './router.hooks';

const routes = [
  <Route
    key="1"
    name="desktop"
    path="/desktop"
    component={DesktopPage}
    onEnter={desktopHooks.onEnter}
  />,
  <Route
    key="2"
    name="prevent-double-click"
    path="/prevent-double-click"
    component={PreventDoubleClickPage}
  />,
  <Route
    key="3"
    name="with-resolves"
    path="/with-resolves"
    component={WithResolvesPage}
    onEnter={withResolvesHooks.onEnter}
  />,
  <Route
    key="4"
    name="with-param"
    path="/with-param(/:p1)"
    component={WithParamPage}
  />
];

export {routes};
