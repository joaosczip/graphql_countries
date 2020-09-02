import { BasicCountry } from "@/domain/models";

export interface LoadCountries {
  load: (params: LoadCountries.Params) => Promise<LoadCountries.Result>;
}

export namespace LoadCountries {
  export type Params = {
    offset: number;
    limit?: 12;
  };
  export type Result = BasicCountry[];
}
