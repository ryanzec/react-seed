var React = require('react/addons');
var applicationStore = require('fluxe').getStore(require('../core/application.store').storeName);
var applicationActions = require('fluxe').getActions(require('../core/application.store').storeName);
var menuActions = require('fluxe').getActions(require('../menu/menu.store').storeName);

var PreventDoubleClick = React.createClass({
  getInitialState: function() {
    return {
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    };
  },

  preventDoubleClickClick: function() {
    if(applicationStore.getPreventDoubleClick() === false) {
      applicationActions.enablePreventDoubleClick();
    } else {
      applicationActions.disablePreventDoubleClick();
    }
  },

  componentDidMount: function() {
    menuActions.update({
      menuName: 'preventDoubleClick'
    });
    applicationStore.on('preventDoubleClickChanged', this._callback);
  },

  componentWillUnmount: function() {
    applicationStore.removeListener('preventDoubleClickChanged', this._callback);
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <h1 id="test" className="test">{window.i18n['desktop/prevent-double-click'].header()}</h1>
        <div>
          <button disabled={this.state.preventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button1()}</button>
          <button onClick={this.preventDoubleClickClick}>{window.i18n['desktop/prevent-double-click'].button2()}</button>
        </div>
      </div>
    );
    /* jshint ignore:end */
  },

  _callback: function() {
    this.setState({
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    });
  }
});

module.exports = PreventDoubleClick;
