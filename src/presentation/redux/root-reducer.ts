import { combineReducers } from "redux";
import { globalReducer } from "@/presentation/redux/reducers";

export default combineReducers({
  global: globalReducer,
});
