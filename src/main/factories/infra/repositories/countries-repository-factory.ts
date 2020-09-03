import { GraphqlCountriesRepository } from "@/infra/repositories";

export const countriesRepositoryFactory = (): GraphqlCountriesRepository => {
  return new GraphqlCountriesRepository();
};
