var React = require('react/addons');
var applicationStore = require('../core/application.store');
var menuStore = require('../menu/menu.store');

var PreventDoubleClick = React.createClass({
  getInitialState: function() {
    return {
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    };
  },

  preventDoubleClickClick: function() {
    if(applicationStore.getPreventDoubleClick() === false) {
      applicationStore.enablePreventDoubleClick();
    } else {
      applicationStore.disablePreventDoubleClick();
    }
  },

  componentDidMount: function() {
    menuStore.update({
      menuName: 'preventDoubleClick'
    });
    applicationStore.on('preventDoubleClickChanged', this._callback);
  },

  componentWillUnmount: function() {
    applicationStore.removeListener('preventDoubleClickChanged', this._callback);
  },

  render: function() {
    return (
      <div>
        <h1 id="test" className="test">{window.i18n['desktop/prevent-double-click'].header()}</h1>
        <div>
          <button disabled={this.state.preventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button1()}</button>
          <button onClick={this.preventDoubleClickClick}>{window.i18n['desktop/prevent-double-click'].button2()}</button>
        </div>
      </div>
    );
  },

  _callback: function() {
    this.setState({
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    });
  }
});

module.exports = PreventDoubleClick;
