import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { globalReducer } from "@/presentation/redux/reducers";
import Home from ".";
import { LoadCountriesSpy, mockInitialState } from "@/presentation/test";

type Sut = {
  loadCountriesSpy: LoadCountriesSpy;
};

const history = createMemoryHistory({ initialEntries: ["/"] });
const initialState = mockInitialState();

const sutFactory = (
  loadCountriesSpy = new LoadCountriesSpy(),
  state = initialState
): Sut => {
  render(
    <Router history={history}>
      <Provider store={createStore(globalReducer, state as any)}>
        <Home loadCountries={loadCountriesSpy} />
      </Provider>
    </Router>
  );
  return {
    loadCountriesSpy,
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

    expect(await screen.findByTestId("error-container")).toBeInTheDocument();
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
  it("should display an alert with error message on global error", async () => {
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
});
