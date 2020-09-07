import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import { GlobalState } from "./reducers/global";
import { SearchState } from "./reducers/search";

const middlewares = [logger];

export type RootState = {
  global: GlobalState;
  search: SearchState;
};

export default createStore(rootReducer, applyMiddleware(...middlewares));
