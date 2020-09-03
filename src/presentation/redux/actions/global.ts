import GlobalTypes from "@/presentation/redux/types/global";

export type Action = {
  type: string;
  payload: any;
};

export const setCurrentError = (error: Error): Action => ({
  type: GlobalTypes.SET_CURRENT_ERROR,
  payload: error,
});
