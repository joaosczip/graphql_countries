import { combineReducers } from "redux";
import { globalReducer, searchReducer } from "@/presentation/redux/reducers";

export default combineReducers({
  global: globalReducer,
  search: searchReducer,
});
