var React = require('react/addons');
var menuActions = require('fluxe').getActions(require('../menu/menu.store').storeName);

var Desktop = React.createClass({
  componentDidMount: function() {
    menuActions.update({
      menuName: 'desktop'
    });
  },
  render: function() {
    return (
      <h1 id="test" className="test">Desktop</h1>
    );
  }
});

module.exports = Desktop;
