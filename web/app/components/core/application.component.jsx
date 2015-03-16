var React = require('react/addons');
var Header = require('./header.component.jsx');
var RouteHandler = require('react-router').RouteHandler;

//TODO: remove: for testing assets rewrit eprocess
var removeMe = '/app/components/core/remove-me.svg#icon-small';

var Application = React.createClass({
  render: function applicationComponentRender() {
    return (
      <div className="application">
        <Header />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Application;
