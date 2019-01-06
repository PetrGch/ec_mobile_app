import {UI_START_LOADING, UI_STOP_LOADING} from "../constant/ui";

export function uiStartLoading() {
  return {
    type: UI_START_LOADING
  }
}

export function uiStopLoading() {
  return {
    type: UI_STOP_LOADING
  }
}