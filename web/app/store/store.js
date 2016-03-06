import {
  createStore,
  combineReducers
} from 'redux';
import {routerReducer} from 'react-router-redux';

import menu from './menu/menu.reducer';
import preventDoubleClick from './prevent-double-click/prevent-double-click.reducer';
import users from './users/users.reducer';

let myReducers = {
  menu,
  preventDoubleClick,
  users
};

let reducers = {};

Object.assign(reducers, myReducers, {
  routing: routerReducer
});

export default createStore(combineReducers(reducers));
