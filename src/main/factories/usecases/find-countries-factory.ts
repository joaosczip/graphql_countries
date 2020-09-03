import { FindCountries } from "@/domain/usecases";
import { RemoteFindCountries } from "@/data/usecases";
import { countriesRepositoryFactory } from "@/main/factories/infra";

export const findCountriesFactory = (): FindCountries => {
  return new RemoteFindCountries(countriesRepositoryFactory());
};
