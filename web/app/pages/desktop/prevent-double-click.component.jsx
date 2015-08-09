var React = require('react/addons');
var applicationStore = require('../../stores/application.store');
var menuStore = require('../../stores/menu.store');

var preventDoubleClick = {};

preventDoubleClick.displayName = 'PreventDoubleClick';

preventDoubleClick.getInitialState = function preventDoubleClickComponentGetInitialState() {
  return {
    preventDoubleClick: applicationStore.getPreventDoubleClick()
  };
};

preventDoubleClick.componentDidMount = function preventDoubleClickComponentComponentDidMount() {
  menuStore.update({
    menuName: 'preventDoubleClick'
  });
  applicationStore.on('preventDoubleClickChanged', this.onPreventDoubleClickChanged);
};

preventDoubleClick.componentWillUnmount = function preventDoubleClickComponentComponentWillUnmount() {
  applicationStore.removeListener('preventDoubleClickChanged', this.onPreventDoubleClickChanged);
};

preventDoubleClick.onClickPreventDoubleClick = function preventDoubleClickComponentOnClickPreventDoubleClick() {
  if (applicationStore.getPreventDoubleClick() === false) {
    applicationStore.enablePreventDoubleClick();
  } else {
    applicationStore.disablePreventDoubleClick();
  }
};

preventDoubleClick.render = function preventDoubleClickComponentRender() {
  return (
    <div className="p-prevent-double-click">
      <h1 id="test" className="test">{window.i18n['desktop/prevent-double-click'].header()}</h1>
      <div>
        <button disabled={this.state.preventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button1()}</button>
        <button onClick={this.onClickPreventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button2()}</button>
      </div>
    </div>
  );
};

preventDoubleClick.onPreventDoubleClickChanged = function preventDoubleClickComponentOnPreventDoubleClickChanged() {
  this.setState({
    preventDoubleClick: applicationStore.getPreventDoubleClick()
  });
};

module.exports = React.createClass(preventDoubleClick);
