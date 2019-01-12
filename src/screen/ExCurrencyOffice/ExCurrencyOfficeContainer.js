import { connect } from "react-redux";

import ExCurrencyOffice from "./ExCurrencyOffice";
import {selectCurrencyType} from "../../action";
import {setCurrencyAmount} from "../../action/office";

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
    selectCurrencyType: (currencyType) => dispatch(selectCurrencyType(currencyType)),
    setCurrencyAmount: (currencyAmount) => dispatch(setCurrencyAmount(currencyAmount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExCurrencyOffice)