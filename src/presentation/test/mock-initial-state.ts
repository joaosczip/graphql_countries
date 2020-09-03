import { RootState } from "@/presentation/redux/store";
import { mockCountry } from "@/domain/test";

export const mockInitialState = (
  error = null,
  currentCountry = mockCountry()
): RootState => ({
  global: {
    error,
    currentCountry,
  },
});
