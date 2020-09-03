import { LoadCountries, FindCountries } from "@/domain/usecases";

export interface LoadCountriesRepository {
  loadAll: (
    params: LoadCountriesRepository.Params
  ) => Promise<LoadCountriesRepository.Result>;
  loadBy: (
    params: LoadCountriesRepository.LoadByParams
  ) => Promise<LoadCountriesRepository.Result>;
}

export namespace LoadCountriesRepository {
  export type Params = LoadCountries.Params;
  export type LoadByParams = FindCountries.Params;
  export type Result = LoadCountries.Result;
}
