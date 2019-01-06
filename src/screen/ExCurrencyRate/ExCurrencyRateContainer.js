import { connect } from "react-redux";

import {getAllOffices, selectCurrencyType} from "../../action/office";
import ExCurrencyRate from "./ExCurrencyRate";

function mapStateToProps(state) {
  return {
    offices: state.office.offices,
    currencyTypes: state.office.currencyTypes,
    filteredOffices: state.office.filteredOffices,
    selectedCurrency: state.office.selectedCurrency,
    currencyAmount: state.office.currencyAmount,
    isLoading: state.ui.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllOffices: () => dispatch(getAllOffices()),
    selectCurrencyType: (currencyType) => dispatch(selectCurrencyType(currencyType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExCurrencyRate)