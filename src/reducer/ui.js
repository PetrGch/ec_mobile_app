import {UI_START_LOADING, UI_STOP_LOADING} from "../constant/ui";

const initialState = {
  isLoading: false,
  loadingFetchList: []
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true,
        loadingFetchList: [...state.loadingFetchList, action.id]
      };
    case UI_STOP_LOADING:
      const loadingFetchList = state.loadingFetchList.filter((fetchId) => fetchId !== action.id);
      return {
        ...state,
        loadingFetchList,
        isLoading: loadingFetchList.length !== 0
      };
    default:
      return state;
  }
}