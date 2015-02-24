var React = require('react/addons');
var menuStore = require('../menu/menu.store');

var Desktop = React.createClass({
  componentDidMount: function() {
    menuStore.update({
      menuName: 'desktop'
    });
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <h1 id="test" className="test">{window.i18n['desktop/desktop'].header()}</h1>
    );
    /* jshint ignore:end */
  }
});

module.exports = Desktop;
