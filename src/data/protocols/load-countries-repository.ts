import { LoadCountries } from "@/domain/usecases";

export interface LoadCountriesRepository {
  loadAll: (
    params: LoadCountriesRepository.Params
  ) => Promise<LoadCountriesRepository.Result>;
}

export namespace LoadCountriesRepository {
  export type Params = LoadCountries.Params;
  export type Result = LoadCountries.Result;
}
