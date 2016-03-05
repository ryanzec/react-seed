import React from 'react';
import {Route} from 'react-router';

import Desktop from './desktop.component.jsx';
import PreventDoubleClick from './prevent-double-click.component.jsx';
import WithResolves from './with-resolves.component.jsx';
import WithParam from './with-param.component.jsx';

import {
  desktop as desktopHooks,
  withResolves as withResolvesHooks
} from './router.hooks';

const routes = [
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
];

export {routes};
