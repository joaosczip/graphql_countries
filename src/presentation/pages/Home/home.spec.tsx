import React from "react";
import faker from "faker";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { globalReducer } from "@/presentation/redux/reducers";
import Home from ".";
import {
  LoadCountriesSpy,
  mockInitialState,
  FindCountriesSpy,
} from "@/presentation/test";

jest.useFakeTimers();

type Sut = {
  loadCountriesSpy: LoadCountriesSpy;
  findCountriesSpy: FindCountriesSpy;
};

const history = createMemoryHistory({ initialEntries: ["/"] });
const initialState = mockInitialState();

const sutFactory = (
  loadCountriesSpy = new LoadCountriesSpy(),
  state = initialState,
  findCountriesSpy = new FindCountriesSpy()
): Sut => {
  render(
    <Router history={history}>
      <Provider store={createStore(globalReducer, state as any)}>
        <Home
          findCountries={findCountriesSpy}
          loadCountries={loadCountriesSpy}
        />
      </Provider>
    </Router>
  );
  return {
    loadCountriesSpy,
    findCountriesSpy,
  };
};

describe("Home", () => {
  it("should calls LoadCountries on load", () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const state = mockInitialState(null, null, []);
    sutFactory(loadCountriesSpy, state);
    expect(loadCountriesSpy.callsCount).toBe(1);
    expect(loadCountriesSpy.params).toEqual({
      offset: 0,
      limit: 12,
    });
  });
  it("should not calls FindCountries on load", () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const state = mockInitialState(null, null, []);
    const { findCountriesSpy } = sutFactory(loadCountriesSpy, state);
    expect(screen.queryByTestId("autocomplete")).not.toBeInTheDocument();
    expect(findCountriesSpy.callsCount).toBe(0);
  });
  it("should shows the cards skeleton on loading", async () => {
    sutFactory();
    const spinner = await screen.findByTestId("skeleton");
    expect(spinner).toBeInTheDocument();
  });
  it("should renders the correct countries", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const state = mockInitialState(null, null, loadCountriesSpy.countries);
    sutFactory(loadCountriesSpy, state);
    const container = await screen.findByTestId("countries-container");
    expect(container.children).toHaveLength(loadCountriesSpy.countries.length);

    const firstCountryElement = container.children[0];
    const secondCountryElement = container.children[1];

    expect(firstCountryElement.querySelector("h2")).toHaveTextContent(
      loadCountriesSpy.countries[0].name
    );
    expect(firstCountryElement.querySelector("img")).toHaveAttribute(
      "src",
      loadCountriesSpy.countries[0].flag
    );
    expect(secondCountryElement.querySelector("h2")).toHaveTextContent(
      loadCountriesSpy.countries[1].name
    );
    expect(secondCountryElement.querySelector("img")).toHaveAttribute(
      "src",
      loadCountriesSpy.countries[1].flag
    );
  });
  it("should display an error message if LoadCountries throws", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const state = mockInitialState(null, null, []);
    const error = new Error("Error loading countries");
    jest.spyOn(loadCountriesSpy, "load").mockRejectedValueOnce(error);

    sutFactory(loadCountriesSpy, state);

    const container = await screen.findByTestId("countries-container");
    expect(container.children).toHaveLength(0);

    expect(await screen.findByTestId("error-alert")).toBeInTheDocument();
    expect(await screen.findByTestId("error-message")).toHaveTextContent(
      error.message
    );
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
  });
  it("should display nothing on countries if empty", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    loadCountriesSpy.countries = [];
    const state = mockInitialState(null, null, []);
    sutFactory(loadCountriesSpy, state);
    const container = await screen.findByTestId("countries-container");
    expect(container.children).toHaveLength(0);
  });
  it("should calls LoadCountries with different offset on scroll", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const state = mockInitialState(null, null, loadCountriesSpy.countries);
    sutFactory(loadCountriesSpy, state);
    fireEvent.scroll(window, { y: 1000 });
    await screen.findByTestId("countries-container");
    expect(loadCountriesSpy.params).toEqual({
      offset: 12,
      limit: 12,
    });
  });
  it("should redirect to the country page on details button click", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const state = mockInitialState(null, null, loadCountriesSpy.countries);
    sutFactory(loadCountriesSpy, state);
    const country = loadCountriesSpy.countries[0];
    const container = await screen.findByTestId("countries-container");
    const detailsButton = container.children[0].querySelectorAll("button")[1];
    detailsButton.click();
    expect(history.location.pathname).toBe(`/country/${country.id}`);
  });
  it("should display an alert with error message on error", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const error = new Error("Ops");
    const state = mockInitialState(error, null, loadCountriesSpy.countries);
    sutFactory(loadCountriesSpy, state);
    await screen.findByTestId("countries-container");
    expect(screen.queryByTestId("error-alert")).toBeInTheDocument();
    expect(screen.queryByTestId("error-message")).toHaveTextContent(
      error.message
    );
  });
  it("should close the error alert on close button click", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const error = new Error("Ops");
    const state = mockInitialState(error, null, loadCountriesSpy.countries);
    sutFactory(loadCountriesSpy, state);
    await screen.findByTestId("countries-container");
    const errorContainer = screen.queryByTestId("error-alert");
    const closeButton = errorContainer.querySelector("button");
    userEvent.click(closeButton);
    await waitFor(() => {
      expect(errorContainer).not.toBeInTheDocument();
    });
  });
  it("should close the error alert after 5 seconds", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const error = new Error("Ops");
    const state = mockInitialState(error, null, loadCountriesSpy.countries);
    sutFactory(loadCountriesSpy, state);
    await screen.findByTestId("countries-container");
    const errorContainer = screen.queryByTestId("error-alert");
    await waitFor(() => {
      expect(errorContainer).not.toBeInTheDocument();
    });
  });
  it("should calls FindCountries on search", async () => {
    const { findCountriesSpy } = sutFactory();
    const searchInput = screen.getByTestId("search-input");
    const search = faker.random.word();
    userEvent.type(searchInput, search);
    await waitFor(() => {
      expect(findCountriesSpy.params).toEqual({
        name: search,
      });
    });
  });
  it("should shows error if FindCountries throws", async () => {
    const findCountriesSpy = new FindCountriesSpy();
    const error = new Error("Error while searching countries");
    const loadCountriesSpy = new LoadCountriesSpy();
    const state = mockInitialState(null, null, loadCountriesSpy.countries);
    jest.spyOn(findCountriesSpy, "find").mockRejectedValueOnce(error);
    sutFactory(loadCountriesSpy, state, findCountriesSpy);
    const searchInput = screen.getByTestId("search-input");
    const search = faker.random.word();
    userEvent.type(searchInput, search);
    await waitFor(() => {
      expect(screen.queryByTestId("error-message")).toHaveTextContent(
        error.message
      );
    });
  });
  it.skip("should render the searched items on the autocomplete", async () => {
    const { findCountriesSpy } = sutFactory();
    const searchInput = screen.getByTestId("search-input");
    const search = faker.random.word();
    userEvent.type(searchInput, search);
    await waitFor(() => {
      expect(screen.queryByTestId("autocomplete")).toBeInTheDocument();
    });

    const { countries } = findCountriesSpy;
    const flags = screen.getAllByTitle("search-flag");
    const names = screen.getAllByTitle("search-name");
    const capitals = screen.getAllByTitle("search-capital");

    expect(flags[0]).toHaveAttribute("src", countries[0].flag);
    expect(names[0]).toHaveTextContent(countries[0].name);
    expect(capitals[0]).toHaveTextContent(countries[0].capital);

    expect(flags[1]).toHaveAttribute("src", countries[1].flag);
    expect(names[1]).toHaveTextContent(countries[1].name);
    expect(capitals[1]).toHaveTextContent(countries[1].capital);
  });
  it.skip("should hides the autocomplete if the search term is empty", async () => {
    sutFactory();
    const searchInput = screen.getByTestId("search-input");
    const search = faker.random.word();
    userEvent.type(searchInput, search);
    await waitFor(() => {
      expect(screen.queryByTestId("autocomplete")).toBeInTheDocument();
    });
    userEvent.clear(searchInput);
    await waitFor(() => {
      expect(screen.queryByTestId("autocomplete")).not.toBeInTheDocument();
    });
  });
  it.skip("should redirect to the country page on search item click", async () => {
    const { findCountriesSpy } = sutFactory();
    const searchInput = screen.getByTestId("search-input");
    const search = faker.random.word();
    userEvent.type(searchInput, search);
    await waitFor(() => {
      expect(screen.queryByTestId("autocomplete")).toBeInTheDocument();
    });
    const firstItem = screen.getAllByTestId("list-item")[0];
    userEvent.click(firstItem);
    expect(history.location.pathname).toBe(
      `/country/${findCountriesSpy.countries[0].id}`
    );
  });
});
