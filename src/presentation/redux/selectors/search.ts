import { RootState } from "@/presentation/redux/store";

export const selectSearchInput = (state: RootState) => state.search.searchInput;
export const selectSearchItems = (state: RootState) => state.search.searchItems;
