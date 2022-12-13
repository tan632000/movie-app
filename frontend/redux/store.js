import { createStore } from "redux";

export default (rootReducer) => {
  const store = createStore(rootReducer);
  return store;
};
