var React = require('react/addons');
var Header = require('./header.component.jsx');
var RouteHandler = require('react-router').RouteHandler;

//TODO: remove: for testing assets rewrite process
var removeMe = '/app/svg/remove-me.svg#icon-small';

var application = {};

application.displayName = 'Application';

application.render = function applicationRender() {
  return (
    <div className="application">
      <Header />
      <RouteHandler routerState={this.props.routerState} />
    </div>
  );
};

module.exports = React.createClass(application);
