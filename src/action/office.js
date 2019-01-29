import { AsyncStorage } from "react-native";

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
      .then((response) => {
        return response.json();
      })
      .catch(() =>
        AsyncStorage.getItem("ec:companies")
          .then((data) => {
            if (data) {
              dispatch(setAllOffices(JSON.parse(data)));
            }
          })
      )
      .then((offices) => {
        if (offices) {
          dispatch(setAllOffices(offices));
          AsyncStorage.setItem("ec:companies", JSON.stringify(offices));
        }
      })
      .catch(() =>
        AsyncStorage.getItem("ec:companies")
          .then((data) => {
            if (data) {
              dispatch(setAllOffices(JSON.parse(data)));
            }
          })
      )
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
      .then((response) => response.json())
      .catch(() =>
        AsyncStorage.getItem("ec:centralBank")
          .then((data) => {
            if (data) {
              dispatch(setCentralBankData(JSON.parse(data)));
            }
          })
      )
      .then((centralBank) => {
        if (centralBank) {
          dispatch(setCentralBankData(centralBank));
          AsyncStorage.setItem("ec:centralBank", JSON.stringify(centralBank));
        }
      })
      .catch(() =>
        AsyncStorage.getItem("ec:centralBank")
          .then((data) => {
            if (data) {
              dispatch(setCentralBankData(JSON.parse(data)));
            }
          })
      )
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
