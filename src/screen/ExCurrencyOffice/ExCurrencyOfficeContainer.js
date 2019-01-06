import { connect } from "react-redux";

import ExCurrencyOffice from "./ExCurrencyOffice";

function mapStateToProps(state) {
  return {
    offices: state.office.offices,
    isLoading: state.ui.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExCurrencyOffice)