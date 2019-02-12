import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../../components/Home/Home';


function mapStateToProps() {
  return {};
}

const actions = {
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
