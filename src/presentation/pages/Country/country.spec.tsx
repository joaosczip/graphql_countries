import React from "react";
import faker from "faker";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { globalReducer } from "@/presentation/redux/reducers";
import { RootState } from "@/presentation/redux/store";
import Country from ".";
import { ShowCountrySpy, mockInitialState } from "@/presentation/test";
import { mockBasicCountries } from "@/domain/test";

const fakeCountryId = faker.random.number();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ countryId: fakeCountryId }),
}));

type Sut = {
  showCountrySpy: ShowCountrySpy;
};

const history = createMemoryHistory({
  initialEntries: [`/country/${fakeCountryId}`],
});

type SutParams = {
  showCountrySpy?: ShowCountrySpy;
  state?: RootState;
};
const initialState = mockInitialState();
const sutFactory = ({
  showCountrySpy = new ShowCountrySpy(),
  state = initialState,
}: SutParams): Sut => {
  const store = createStore(globalReducer, state as any);
  render(
    <Router history={history}>
      <Provider store={store}>
        <Country showCountry={showCountrySpy} />
      </Provider>
    </Router>
  );

  return { showCountrySpy };
};

describe("Country", () => {
  it("should shows country skeleton and calls ShowCountry on load with correct id", async () => {
    const { showCountrySpy } = sutFactory({} as SutParams);
    await waitFor(() => {
      expect(screen.queryByTestId("country-skeleton")).toBeInTheDocument();
    });
    expect(showCountrySpy.countryId).toEqual(fakeCountryId);
  });
  it("should hide the skeleton and present the correct country values", async () => {
    const showCountrySpy = new ShowCountrySpy();
    const state = mockInitialState(null, showCountrySpy.country);
    sutFactory({ showCountrySpy, state });
    const countryContainer = await screen.findByTestId("country-container");
    expect(countryContainer).toBeInTheDocument();

    const formatNum = (num) =>
      new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0 }).format(num);

    expect(countryContainer.querySelector("img")).toHaveAttribute(
      "src",
      showCountrySpy.country.flag
    );
    expect(screen.getByTestId("country-name")).toHaveTextContent(
      showCountrySpy.country.name
    );
    expect(
      screen.getByTestId("capital").querySelector("span")
    ).toHaveTextContent(`Capital: ${showCountrySpy.country.capital}`);
    expect(
      screen.getByTestId("population").querySelector("span")
    ).toHaveTextContent(
      `População: ${formatNum(showCountrySpy.country.population)}`
    );
    expect(screen.getByTestId("area").querySelector("span")).toHaveTextContent(
      `Área: ${formatNum(showCountrySpy.country.area)} m²`
    );
    expect(
      screen.getByTestId("top-level").querySelector("span")
    ).toHaveTextContent(
      `Domínio de topo: ${showCountrySpy.country.topLevelDomains}`
    );
  });
  it("should redirect to Home on error", async () => {
    const showCountrySpy = new ShowCountrySpy();
    const error = new Error("Error while fetching the country");
    jest.spyOn(showCountrySpy, "find").mockRejectedValueOnce(error);
    sutFactory({ showCountrySpy });
    await waitFor(() => {
      expect(screen.queryByTestId("country-container")).not.toBeInTheDocument();
    });
    expect(history.location.pathname).toBe("/");
  });
  it("should open the update country modal on update button click", async () => {
    sutFactory({});
    const updateButton = await screen.findByTestId("update");
    fireEvent.click(updateButton);
    expect(screen.queryByTestId("update-country")).toBeInTheDocument();
  });
  it("should show the correct values on modal", async () => {
    const showCountrySpy = new ShowCountrySpy();
    const countries = mockBasicCountries();
    countries.push(showCountrySpy.country);
    const state = mockInitialState(null, showCountrySpy.country, countries);
    sutFactory({
      showCountrySpy,
      state,
    });

    const updateButton = await screen.findByTestId("update");
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.queryByTestId("update-country")).toBeInTheDocument();
    });

    expect(screen.getByTitle("title")).toHaveTextContent(
      showCountrySpy.country.name
    );
    expect(screen.getByTestId("name-input")).toHaveValue(
      showCountrySpy.country.name
    );
    expect(screen.getByTestId("capital-input")).toHaveValue(
      showCountrySpy.country.capital
    );
    expect(screen.getByTestId("population-input")).toHaveValue(
      showCountrySpy.country.population
    );
    expect(screen.getByTestId("area-input")).toHaveValue(
      showCountrySpy.country.area
    );
    expect(screen.getByTestId("top-level-input")).toHaveValue(
      showCountrySpy.country.topLevelDomains
    );
  });
  it("should close the modal on close button click", async () => {
    const showCountrySpy = new ShowCountrySpy();
    const countries = mockBasicCountries();
    countries.push(showCountrySpy.country);
    const state = mockInitialState(null, showCountrySpy.country, countries);
    sutFactory({
      showCountrySpy,
      state,
    });

    const updateButton = await screen.findByTestId("update");
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.queryByTestId("update-country")).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("close-modal"));

    await waitFor(() => {
      expect(screen.queryByTestId("form")).not.toBeInTheDocument();
    });
  });
  it("should close the update modal on form submit", async () => {
    sutFactory({});

    const updateButton = await screen.findByTestId("update");
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.queryByTestId("form")).toBeInTheDocument();
    });

    const newValues = {
      name: faker.address.country(),
      capital: faker.address.city(),
      population: faker.random.number(),
      area: faker.random.number(),
      topLevel: faker.random.word(),
    };

    const nameInput = screen.getByTestId("name-input") as HTMLInputElement;
    const capitalInput = screen.getByTestId(
      "capital-input"
    ) as HTMLInputElement;
    const populationInput = screen.getByTestId(
      "population-input"
    ) as HTMLInputElement;
    const areaInput = screen.getByTestId("area-input") as HTMLInputElement;
    const topLevelDomainInput = screen.getByTestId(
      "top-level-input"
    ) as HTMLInputElement;

    fireEvent.input(nameInput, { target: { value: newValues.name } });
    fireEvent.input(capitalInput, { target: { value: newValues.capital } });
    fireEvent.input(populationInput, {
      target: { value: String(newValues.population) },
    });
    fireEvent.input(areaInput, { target: { value: String(newValues.area) } });
    fireEvent.input(topLevelDomainInput, {
      target: { value: newValues.topLevel },
    });

    userEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(screen.queryByTestId("form")).not.toBeInTheDocument();
    });
  });
});
