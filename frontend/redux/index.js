import { combineReducers } from "redux";
import configureStore from "./store";
import authRedux from "./authRedux";

export const reducers = combineReducers({
  auth: authRedux,
});

let store = configureStore(reducers);
export default store;
