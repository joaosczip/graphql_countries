import GlobalTypes from "@/presentation/redux/types/global";
import { Action } from "@/presentation/redux/actions/global";

export type GlobalState = {
  error: Error;
};

const INITAL_STATE = {
  error: null,
};

const globalReducer = (state = INITAL_STATE, action: Action): GlobalState => {
  switch (action.type) {
    case GlobalTypes.SET_CURRENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
