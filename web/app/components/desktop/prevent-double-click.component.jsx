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
    return (
      <div>
        <h1 id="test" className="test">Prevent Double Click</h1>
        <div>
          <button disabled={this.state.preventDoubleClick}>Test</button>
          <button onClick={this.preventDoubleClickClick}>Prevent Double Click Other Buttons</button>
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
