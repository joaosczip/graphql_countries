import GlobalTypes from "@/presentation/redux/types/global";
import { Action } from "@/presentation/redux/actions/global";
import { Country } from "@/domain/models";

export type GlobalState = {
  error: Error;
  currentCountry: Country;
};

const INITAL_STATE: GlobalState = {
  error: null,
  currentCountry: null,
};

const globalReducer = (state = INITAL_STATE, action: Action): GlobalState => {
  switch (action.type) {
    case GlobalTypes.SET_CURRENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GlobalTypes.SET_CURRENT_COUNTRY:
      return {
        ...state,
        currentCountry: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
