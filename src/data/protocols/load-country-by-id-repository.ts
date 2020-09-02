import { ShowCountry } from "@/domain/usecases";

export interface LoadCountryByIdRepository {
  load: (countryId: number) => Promise<LoadCountryByIdRepository.Result>;
}

export namespace LoadCountryByIdRepository {
  export type Result = ShowCountry.Result;
}
