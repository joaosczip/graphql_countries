import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import { GlobalState } from "./reducers/global";

const middlewares = [logger];

export type RootState = {
  global: GlobalState;
};

export default createStore(rootReducer, applyMiddleware(...middlewares));
