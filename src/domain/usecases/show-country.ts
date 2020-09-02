import { Country } from "@/domain/models";

export interface ShowCountry {
  find: (countryId: number) => Promise<ShowCountry.Result>;
}

export namespace ShowCountry {
  export type Result = Country;
}
