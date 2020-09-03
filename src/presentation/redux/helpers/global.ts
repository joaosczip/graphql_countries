import { Country, BasicCountry } from "@/domain/models";

export const updateCountry = (
  countries: BasicCountry[],
  country: Country
): {
  countries: BasicCountry[];
  country: Country;
} => {
  const countriesCopy = [...countries];
  const countryIndex = countriesCopy.findIndex(({ id }) => id === country.id);
  countriesCopy[countryIndex] = {
    ...countriesCopy[countryIndex],
    name: country.name,
    capital: country.capital,
    flag: country.flag,
  };
  return {
    countries: countriesCopy,
    country,
  };
};
