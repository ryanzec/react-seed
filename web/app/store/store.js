var redux = require('redux');
var reactRouterRedux = require('react-router-redux');
var lodash = require('lodash');

var reducers = _.extend({
  menu: require('./reducers/menu.reducer'),
  preventDoubleClick: require('./reducers/prevent-double-click.reducer'),
  users: require('./reducers/users.reducer')
}, {
  routing: reactRouterRedux.routerReducer
});

module.exports = redux.createStore(redux.combineReducers(reducers));
