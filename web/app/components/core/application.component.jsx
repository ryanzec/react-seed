var React = require('react/addons');
var Header = require('./header.component.jsx');

var Application = React.createClass({
  render: function() {
    return (
      <div className="application">
        <Header />
        <div className="main-content"></div>
      </div>
    );
  }
});

module.exports = Application;
