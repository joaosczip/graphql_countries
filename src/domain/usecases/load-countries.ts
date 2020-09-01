import { BasicCountry } from "@/domain/models";

export interface LoadCountries {
  load: () => Promise<LoadCountries.Result>;
}

export namespace LoadCountries {
  export type Result = BasicCountry[];
}
