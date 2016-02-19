import {
  createStore,
  combineReducers
} from 'redux';
import {routerReducer} from 'react-router-redux';

import menu from './reducers/menu.reducer';
import preventDoubleClick from './reducers/prevent-double-click.reducer';
import users from './reducers/users.reducer';

let myReducers = {
  menu,
  preventDoubleClick,
  users
};

let reducers = {};
Object.assign(reducers, myReducers, {
  routing: routerReducer
});

module.exports = createStore(combineReducers(reducers));
