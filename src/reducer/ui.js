import {UI_START_LOADING, UI_STOP_LOADING} from "../constant/ui";

const initialState = {
  isLoading: false
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case UI_START_LOADING:
      return {...state, isLoading: true};
    case UI_STOP_LOADING:
      return {...state, isLoading: false};
    default:
      return state;
  }
}