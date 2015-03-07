var React = require('react/addons');
var applicationStore = require('../core/application.store');
var menuStore = require('../menu/menu.store');

var PreventDoubleClick = React.createClass({
  getInitialState: function preventDoubleClickComponentGetInitialState() {
    return {
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    };
  },

  onClickPreventDoubleClick: function preventDoubleClickComponentOnClickPreventDoubleClick() {
    if(applicationStore.getPreventDoubleClick() === false) {
      applicationStore.enablePreventDoubleClick();
    } else {
      applicationStore.disablePreventDoubleClick();
    }
  },

  componentDidMount: function preventDoubleClickComponentComponentDidMount() {
    menuStore.update({
      menuName: 'preventDoubleClick'
    });
    applicationStore.on('preventDoubleClickChanged', this.onPreventDoubleClickChanged);
  },

  componentWillUnmount: function preventDoubleClickComponentComponentWillUnmount() {
    applicationStore.removeListener('preventDoubleClickChanged', this.onPreventDoubleClickChanged);
  },

  render: function preventDoubleClickComponentRender() {
    return (
      <div>
        <h1 id="test" className="test">{window.i18n['desktop/prevent-double-click'].header()}</h1>
        <div>
          <button disabled={this.state.preventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button1()}</button>
          <button onClick={this.onClickPreventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button2()}</button>
        </div>
      </div>
    );
  },

  onPreventDoubleClickChanged: function preventDoubleClickComponentOnPreventDoubleClickChanged() {
    this.setState({
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    });
  }
});

module.exports = PreventDoubleClick;
