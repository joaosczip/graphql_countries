import { Country, BasicCountry } from "@/domain/models";
import GlobalTypes from "@/presentation/redux/types/global";
import { Action } from "@/presentation/redux/actions/global";
import { updateCountry } from "@/presentation/redux/helpers";

export type GlobalState = {
  countries: BasicCountry[];
  currentCountry: Country;
  error: Error;
  queryOffset: number;
  updated: boolean;
};

const INITAL_STATE: GlobalState = {
  countries: [],
  error: null,
  currentCountry: null,
  queryOffset: 0,
  updated: false,
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
    case GlobalTypes.SET_QUERY_OFFSET:
      return {
        ...state,
        queryOffset: action.payload,
      };
    case GlobalTypes.UPDATE_COUNTRY:
      const { countries, country } = updateCountry(
        action.payload.countries,
        action.payload.country
      );
      return {
        ...state,
        updated: true,
        countries,
        currentCountry: country,
      };
    default:
      return state;
  }
};

export default globalReducer;
