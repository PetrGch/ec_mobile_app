import { connect } from "react-redux";

import ExCurrencyOffice from "./ExCurrencyOffice";
import {selectCurrencyType} from "../../action";

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
    selectCurrencyType: (currencyType) => dispatch(selectCurrencyType(currencyType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExCurrencyOffice)