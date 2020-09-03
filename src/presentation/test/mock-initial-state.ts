import { RootState } from "@/presentation/redux/store";

export const mockInitialState = (error = null): RootState => ({
  global: {
    error,
  },
});
