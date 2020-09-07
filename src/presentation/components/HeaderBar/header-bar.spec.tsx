import faker from "faker";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderBar from ".";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { globalReducer } from "@/presentation/redux/reducers";
import { mockInitialState } from "@/presentation/test";
import { mockBasicCountries } from "@/domain/test";

const initialState = mockInitialState();

type SutParams = {
  state?: any;
};

const sutFactory = ({ state = initialState }: SutParams): void => {
  render(
    <Provider store={createStore(globalReducer, state as any)}>
      <HeaderBar />
    </Provider>
  );
};

describe("HeaderBar", () => {
  it("should render the searched items on the autocomplete", async () => {
    const state = {
      global: initialState.global,
      search: {
        searchInput: faker.random.word(),
        searchItems: mockBasicCountries(),
      },
    };
    sutFactory({ state });
    const searchInput = screen.getByTestId("search-input");
    const search = faker.random.word();
    userEvent.type(searchInput, search);
    const { searchItems } = state.search;
    const flags = screen.getAllByTitle("search-flag");
    const names = screen.getAllByTitle("search-name");
    const capitals = screen.getAllByTitle("search-capital");

    expect(flags[0]).toHaveAttribute("src", searchItems[0].flag);
    expect(names[0]).toHaveTextContent(searchItems[0].name);
    expect(capitals[0]).toHaveTextContent(searchItems[0].capital);

    expect(flags[1]).toHaveAttribute("src", searchItems[1].flag);
    expect(names[1]).toHaveTextContent(searchItems[1].name);
    expect(capitals[1]).toHaveTextContent(searchItems[1].capital);
  });
});
