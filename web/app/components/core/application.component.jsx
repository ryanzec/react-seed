var React = require('react/addons');
var Header = require('./header.component.jsx');
var RouteHandler = require('react-router').RouteHandler;

var Application = React.createClass({
  render: function() {
    /* jshint ignore:start */
    return (
      <div className="application">
        <Header />
        <RouteHandler />
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = Application;
