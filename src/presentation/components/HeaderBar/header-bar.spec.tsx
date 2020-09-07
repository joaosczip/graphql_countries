import faker from "faker";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory, History } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HeaderBar from ".";
import { globalReducer } from "@/presentation/redux/reducers";
import { mockInitialState } from "@/presentation/test";
import { mockBasicCountries } from "@/domain/test";

const initialState = mockInitialState();

type SutParams = {
  state?: any;
  memoryHistory?: History;
};

type Sut = {
  memoryHistory: History;
};

const history = createMemoryHistory({ initialEntries: ["/"] });
const sutFactory = ({
  state = initialState,
  memoryHistory = history,
}: SutParams): Sut => {
  render(
    <Router history={memoryHistory}>
      <Provider store={createStore(globalReducer, state as any)}>
        <HeaderBar />
      </Provider>
    </Router>
  );
  return {
    memoryHistory,
  };
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
  it("should hides the autocomplete if the search term is empty", async () => {
    sutFactory({
      state: {
        global: initialState.global,
        search: {
          searchItems: [],
          searchInput: "",
        },
      },
    });
    expect(screen.queryByTestId("autocomplete")).not.toBeInTheDocument();
  });
  it("should redirect to the country page on search item click", async () => {
    const searchState = {
      searchItems: mockBasicCountries(),
      searchInput: faker.random.word(),
    };
    sutFactory({
      state: {
        global: initialState.global,
        search: searchState,
      },
    });

    const searchInput = screen.getByTestId("search-input");
    const search = faker.random.word();
    userEvent.type(searchInput, search);
    await waitFor(() => {
      expect(screen.queryByTestId("autocomplete")).toBeInTheDocument();
    });
    const firstItem = screen.getAllByTestId("list-item")[0];
    userEvent.click(firstItem);
    expect(history.location.pathname).toBe(
      `/country/${searchState.searchItems[0].id}`
    );
  });
  it("should redirect to home page on app title click", async () => {
    const history = createMemoryHistory({ initialEntries: ["/countries/123"] });
    const { memoryHistory } = sutFactory({ memoryHistory: history });
    userEvent.click(screen.getByTestId("app-title"));
    expect(memoryHistory.location.pathname).toBe(`/`);
  });
  it("should focus input on search-container click", () => {
    sutFactory({
      state: {
        global: initialState.global,
        search: {
          searchItems: [],
          searchInput: "",
        },
      },
    });
    userEvent.click(screen.queryByTestId("search-container"));
    expect(screen.getByTestId("search-input")).toHaveFocus();
  });
});
