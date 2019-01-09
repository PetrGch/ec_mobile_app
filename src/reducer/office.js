import {SELECT_CURRENCY_TYPE, SET_ALL_OFFICES, SET_CURRENCY_AMOUNT} from "../constant/office";
import {filterByCurrency} from "./reducerCalculation";

const initialState = {
  offices: null,
  currencyTypes: null,
  selectedCurrency: "EUR",
  currencyAmount: 100,
  filteredOffices: null
};

export default function office(state = initialState, action) {
  switch(action.type) {
    case SET_ALL_OFFICES:
      return {
        ...state,
        offices: action.offices,
        currencyTypes: action.currencyTypes,
        filteredOffices: filterByCurrency(action.offices, state.selectedCurrency, state.currencyAmount)
      };
    case SELECT_CURRENCY_TYPE:
      return {
        ...state,
        selectedCurrency: action.currencyType,
        filteredOffices: filterByCurrency(state.offices, action.currencyType, state.currencyAmount)
      };
    case SET_CURRENCY_AMOUNT:
      const currencyAmountForFiltering = !!action.currencyAmount ? action.currencyAmount : 1;
      return {
        ...state,
        currencyAmount: action.currencyAmount,
        filteredOffices: filterByCurrency(state.offices, state.selectedCurrency, currencyAmountForFiltering)
      };
    default:
      return state
  }
}