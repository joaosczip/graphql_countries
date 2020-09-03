import GlobalTypes from "@/presentation/redux/types/global";
import { Action } from "@/presentation/redux/actions/global";
import { Country, BasicCountry } from "@/domain/models";

export type GlobalState = {
  countries: BasicCountry[];
  currentCountry: Country;
  error: Error;
};

const INITAL_STATE: GlobalState = {
  countries: [],
  error: null,
  currentCountry: null,
};

const globalReducer = (state = INITAL_STATE, action: Action): GlobalState => {
  switch (action.type) {
    case GlobalTypes.SET_COUNTRIES:
      return {
        ...state,
        countries: [...state.countries, ...action.payload],
      };
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
