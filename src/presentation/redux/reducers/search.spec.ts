import faker from "faker";
import { setSearchInput } from "@/presentation/redux/actions";
import searchReducer from "./search";

describe("SearchReducer", () => {
  it("should update the state with the search input", () => {
    const initialState = {
      searchInput: null,
      searchItems: [],
    };
    const searchInput = faker.random.word();
    const state = searchReducer(initialState, setSearchInput(searchInput));
    expect(state.searchInput).toBe(searchInput);
  });
});
