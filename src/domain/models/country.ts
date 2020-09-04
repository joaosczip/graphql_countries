import { BasicCountry } from "./basic-country";

export type Country = BasicCountry & {
  area: number;
  population: number;
  topLevelDomains: string;
};
