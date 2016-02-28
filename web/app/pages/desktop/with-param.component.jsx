import * as React from 'react';
import {connect} from 'react-redux';
import menuActions from '../../store/actions/menu.actions';

class WithParam extends React.Component {
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

WithParam.displayName = 'RouteParam';

WithParam.propTypes = {
  p1: React.PropTypes.any
};

WithParam.contextTypes = {
  store: React.PropTypes.object
};

let mapStateToProps = function(state, ownProps) {
  return {
    p1: ownProps.params.p1
  };
};

export default connect(mapStateToProps)(WithParam);
