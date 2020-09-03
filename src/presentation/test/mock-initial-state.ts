import { RootState } from "@/presentation/redux/store";
import { mockCountry, mockBasicCountries } from "@/domain/test";

export const mockInitialState = (
  error = null,
  currentCountry = mockCountry(),
  countries = mockBasicCountries()
): RootState => ({
  global: {
    error,
    currentCountry,
    countries,
  },
});
