import SearchType from "@/presentation/redux/types/search";
import { BasicCountry } from "@/domain/models";

export type SearchState = {
  searchInput: string;
  searchItems: BasicCountry[];
};

const INITIAL_STATE: SearchState = {
  searchInput: null,
  searchItems: [],
};

const searchReducer = (state = INITIAL_STATE, action): SearchState => {
  switch (action.type) {
    case SearchType.SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    case SearchType.SEARCH_ITEMS:
      return {
        ...state,
        searchItems: [...state.searchItems, ...action.payload],
      };
    default:
      return state;
  }
};

export default searchReducer;
