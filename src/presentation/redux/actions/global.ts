import GlobalTypes from "@/presentation/redux/types/global";
import { Country, BasicCountry } from "@/domain/models";

export type Action = {
  type: string;
  payload: any;
};

export const setCountries = (
  countries: BasicCountry[]
): Omit<Action, "payload"> & {
  payload: BasicCountry[];
} => ({
  type: GlobalTypes.SET_COUNTRIES,
  payload: countries,
});

export const setCurrentError = (error: Error): Action => ({
  type: GlobalTypes.SET_CURRENT_ERROR,
  payload: error,
});

export const setCurrentCountry = (
  country: Country
): Omit<Action, "payload"> & {
  payload: Country;
} => ({
  type: GlobalTypes.SET_CURRENT_COUNTRY,
  payload: country,
});
