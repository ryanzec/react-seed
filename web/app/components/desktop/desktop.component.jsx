var React = require('react/addons');
var menuActions = require('fluxe').getActions(require('../menu/menu.store').storeName);

var Desktop = React.createClass({
  componentDidMount: function() {
    menuActions.update({
      menuName: 'desktop'
    });
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <h1 id="test" className="test">Desktop</h1>
    );
    /* jshint ignore:end */
  }
});

module.exports = Desktop;
