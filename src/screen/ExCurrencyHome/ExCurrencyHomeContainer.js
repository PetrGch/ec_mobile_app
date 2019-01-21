import { connect } from "react-redux";

import {getAllOffices, getCentralBankData} from "../../action/office";
import ExCurrencyHome from "./ExCurrencyHome";

function mapStateToProps(state) {
  return {
    offices: state.office.offices,
    isLoading: state.ui.isLoading,
    centralBankData: state.office.centralBankData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllOffices: () => dispatch(getAllOffices()),
    loadCentralBankData: () => dispatch(getCentralBankData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExCurrencyHome)