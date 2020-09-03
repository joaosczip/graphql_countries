import GlobalTypes from "@/presentation/redux/types/global";
import { Country } from "@/domain/models";

export type Action = {
  type: string;
  payload: any;
};

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
