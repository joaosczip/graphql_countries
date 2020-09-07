import faker from "faker";
import { setSearchInput, setSearchItems } from "@/presentation/redux/actions";
import searchReducer from "./search";
import { mockBasicCountries } from "@/domain/test";

describe("SearchReducer", () => {
  it("should retuns the same state if no search action is passed", () => {
    const initialState = {
      searchInput: faker.random.word(),
      searchItems: [],
    };
    const state = searchReducer(initialState, {
      type: "ANOTHER_ACTION",
    });
    expect(state).toEqual(initialState);
  });
  it("should update the state with the search input", () => {
    const initialState = {
      searchInput: null,
      searchItems: [],
    };
    const searchInput = faker.random.word();
    const state = searchReducer(initialState, setSearchInput(searchInput));
    expect(state.searchInput).toBe(searchInput);
  });
  it("should update the state with the search items", () => {
    const initialState = {
      searchInput: faker.random.word(),
      searchItems: [],
    };
    const searchItems = mockBasicCountries();
    const state = searchReducer(initialState, setSearchItems(searchItems));
    expect(state.searchItems).toEqual(searchItems);
  });
});
