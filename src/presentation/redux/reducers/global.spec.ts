import globalReducer from "./global";

describe("GlobalReducer", () => {
  it("should return the initial state", () => {
    const initialState = {
      countries: [],
      error: null,
      currentCountry: null,
      queryOffset: 0,
      updated: false,
      toucheds: [],
    };
    const state = globalReducer(undefined, {
      type: "ANOTHER_ACTION",
      payload: {},
    });
    expect(state).toEqual(initialState);
  });
});
