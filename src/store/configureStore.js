import {createStore, compose, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk"

import rootReducer from "../reducer/index";

let composeEnchancer = compose;

if (__DEV__) {
  composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default function configureStore() {
  return createStore(rootReducer, composeEnchancer(applyMiddleware(reduxThunk)));
}
