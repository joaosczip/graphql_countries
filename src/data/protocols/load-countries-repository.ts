import { LoadCountries } from "@/domain/usecases";

export interface LoadCountriesRepository {
  loadAll: () => Promise<LoadCountriesRepository.Result>;
}

export namespace LoadCountriesRepository {
  export type Result = LoadCountries.Result;
}
