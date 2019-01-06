import { combineReducers } from "redux";
import office from "./office";
import ui from "./ui";

const rootReducer = combineReducers({
  office,
  ui
});

export default rootReducer;