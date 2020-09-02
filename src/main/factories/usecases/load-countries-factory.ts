import { LoadCountries } from "@/domain/usecases";
import { RemoteLoadCountries } from "@/data/usecases";
import { countriesRepositoryFactory } from "@/main/factories/infra";

export const loadCountriesFactory = (): LoadCountries => {
  return new RemoteLoadCountries(countriesRepositoryFactory());
};
