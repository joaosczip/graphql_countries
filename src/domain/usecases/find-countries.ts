import { BasicCountry } from "@/domain/models";

export interface FindCountries {
  find: (params: FindCountries.Params) => Promise<FindCountries.Result>;
}

export namespace FindCountries {
  export type Params = {
    name: string;
  };
  export type Result = BasicCountry[];
}
