import { RootState } from "@/presentation/redux/store";

export const selectCountries = (state: RootState) => state.global.countries;
export const selectCurrentCountry = (state: RootState) =>
  state.global.currentCountry;
export const selectQueryOffset = (state: RootState) => state.global.queryOffset;
export const selectError = (state: RootState) => state.global.error;
