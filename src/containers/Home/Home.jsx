import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../../components/Home/Home';
import type { Dispatch } from '../../reducers/types';

function mapStateToProps() {
  return {};
}

const actions: {} = {};

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
