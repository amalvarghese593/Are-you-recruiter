import { createStore, combineReducers } from "redux";
import queryReducer from "./reducer";

const rootReducer = combineReducers({ queryReducer });
const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
