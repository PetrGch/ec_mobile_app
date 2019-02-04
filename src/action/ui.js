import {UI_START_LOADING, UI_STOP_LOADING} from "../constant/ui";

export function uiStartLoading(id) {
  return {
    id,
    type: UI_START_LOADING
  }
}

export function uiStopLoading(id) {
  return {
    id,
    type: UI_STOP_LOADING
  }
}