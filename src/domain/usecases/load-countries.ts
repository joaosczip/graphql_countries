import { BasicCountry } from "@/domain/models";

export interface LoadCountries {
  load: (params: LoadCountries.Params) => Promise<LoadCountries.Result>;
}

export namespace LoadCountries {
  export type Params = {
    offset: number;
    limit?: number;
  };
  export type Result = BasicCountry[];
}
