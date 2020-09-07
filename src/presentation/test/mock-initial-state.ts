import faker from "faker";
import { RootState } from "@/presentation/redux/store";
import { mockCountry, mockBasicCountries } from "@/domain/test";

export const mockInitialState = (
  error = null,
  currentCountry = mockCountry(),
  countries = mockBasicCountries(),
  queryOffset = 0,
  updated = false,
  toucheds = [mockCountry(), mockCountry()]
): RootState => ({
  global: {
    error,
    currentCountry,
    countries,
    queryOffset,
    updated,
    toucheds,
  },
  search: {
    searchInput: faker.random.word(),
    searchItems: mockBasicCountries(),
  },
});
