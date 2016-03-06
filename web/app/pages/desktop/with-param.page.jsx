import React from 'react';
import {connect} from 'react-redux';
import menuActions from '../../store/menu/menu.actions';

class WithParamPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.context.store.dispatch(menuActions.setActive('desktop'));
  }

  render() {
    return (
      <div className="p-with-param">
        <div>
          Param: <span className="param-value">{this.props.p1}</span>
        </div>
      </div>
    );
  }
}

WithParamPage.displayName = 'WithParamPage';

WithParamPage.propTypes = {
  p1: React.PropTypes.any
};

WithParamPage.contextTypes = {
  store: React.PropTypes.object
};

let mapStateToProps = function(state, ownProps) {
  return {
    p1: ownProps.params.p1
  };
};

export default connect(mapStateToProps)(WithParamPage);
