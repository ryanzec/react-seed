var React = require('react/addons');
var Header = require('./header.component.jsx');
var RouteHandler = require('react-router').RouteHandler;

//TODO: remove: for testing assets rewrit eprocess
var removeMe = '/app/components/core/remove-me.svg#icon-small';

var application = {};

application.displayName = 'Application';

application.render = function applicationRender() {
  return (
    <div className="application">
      <Header />
      <RouteHandler />
    </div>
  );
};

module.exports = React.createClass(application);
