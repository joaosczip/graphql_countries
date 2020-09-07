import SearchTypes from "@/presentation/redux/types/search";
import { BasicCountry } from "@/domain/models";

export const setSearchInput = (
  payload: string
): { type: string; payload: string } => ({
  type: SearchTypes.SEARCH_INPUT,
  payload,
});

export const setSearchItems = (
  payload: BasicCountry[]
): { type: string; payload: BasicCountry[] } => ({
  type: SearchTypes.SEARCH_ITEMS,
  payload,
});
