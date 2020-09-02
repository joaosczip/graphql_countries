import { LoadCountriesRepository } from "@/data/protocols";
import { GraphqlCountriesRepository } from "@/infra/repositories";

export const countriesRepositoryFactory = (): LoadCountriesRepository => {
  return new GraphqlCountriesRepository();
};
