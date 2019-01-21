import { connect } from "react-redux";

import {selectCurrencyType, setCurrencyAmount} from "../../action/office";
import ExCurrencyOfficeInfo from "./ExCurrencyOfficeInfo";

function mapStateToProps(state, props) {
  return {
    id: props.id,
    branchName: props.branch_name,

    offices: state.office.offices,
    currencyTypes: state.office.currencyTypes,
    filteredOffices: state.office.filteredOffices,
    selectedCurrency: state.office.selectedCurrency,
    currencyAmount: state.office.currencyAmount,
    isLoading: state.ui.isLoading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCurrencyType: (currencyType) => dispatch(selectCurrencyType(currencyType)),
    setCurrencyAmount: (currencyAmount) => dispatch(setCurrencyAmount(currencyAmount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExCurrencyOfficeInfo)