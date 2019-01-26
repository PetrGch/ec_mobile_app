import {uiStartLoading, uiStopLoading} from "./ui";
import {SELECT_CURRENCY_TYPE, SET_ALL_OFFICES, SET_CENTRAL_BANK_DATA, SET_CURRENCY_AMOUNT} from "../constant/office";
import {prepopulateCurrencyType} from "./actionCalculation";

function setAllOffices(offices) {
  return {
    offices,
    type: SET_ALL_OFFICES,
    currencyTypes: prepopulateCurrencyType(offices)
  }
}

export function getAllOffices() {
  return (dispatch) => {
    dispatch(uiStartLoading());

    fetch("https://api.excurrate.com/exCompany")
      .then((response) => response.json(), (ex) => new Error(ex))
      .then((offices) => {
        dispatch(setAllOffices(offices))
      })
      .catch((ex) => {
        alert(ex.message)
      })
      .finally(() => {
        dispatch(uiStopLoading());
      })
  }
}

function setCentralBankData(centralBankData) {
  return {
    centralBankData,
    type: SET_CENTRAL_BANK_DATA
  }
}

export function getCentralBankData(period = 7, currencyType = "EUR") {
  return (dispatch) => {
    dispatch(uiStartLoading());

    fetch(`https://api.excurrate.com/centralBank?period=${period}&currencyType=${currencyType}`)
      .then((response) => response.json(), (ex) => new Error(ex))
      .then((data) => {
        if (data) {
          dispatch(setCentralBankData(data))
        }
      })
      .catch((ex) => {
        console.log(ex)
        alert(ex.message)
      })
      .finally(() => {
        dispatch(uiStopLoading());
      })
  }
}

export function selectCurrencyType(currencyType) {
  return {
    currencyType,
    type: SELECT_CURRENCY_TYPE,
  }
}

export function setCurrencyAmount(currencyAmount) {
  return {
    currencyAmount,
    type: SET_CURRENCY_AMOUNT,
  }
}
