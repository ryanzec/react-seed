var React = require('react/addons');
var Header = require('./header.component.jsx');
var RouteHandler = require('react-router').RouteHandler;

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
