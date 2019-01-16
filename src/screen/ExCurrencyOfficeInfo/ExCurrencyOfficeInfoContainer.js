import { connect } from "react-redux";

import {selectCurrencyType, setCurrencyAmount} from "../../action/office";
import ExCurrencyOfficeInfo from "./ExCurrencyOfficeInfo";

function mapStateToProps(state, props) {
  return {
    branchName: props.branch_name,
    companyName: props.company_name,
    lat: props.lat,
    lng: props.lng,
    workingTime: props.workingTime,
    address: props.address,
    updatedAt: props.updated_at,
    buyPrice: props.buy_price,
    sellPrice: props.sell_price,
    currencyMark: props.currencyMark,
    googleMapUrl: props.google_map_url,
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