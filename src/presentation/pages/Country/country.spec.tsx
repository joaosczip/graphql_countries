import React from "react";
import faker from "faker";
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Country from ".";
import { ShowCountrySpy } from "@/presentation/test";

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
const sutFactory = (showCountrySpy = new ShowCountrySpy()): Sut => {
  render(
    <Router history={history}>
      <Country showCountry={showCountrySpy} />
    </Router>
  );

  return { showCountrySpy };
};

describe("Country", () => {
  it("should shows country skeleton and calls ShowCountry on load with correct id", async () => {
    const { showCountrySpy } = sutFactory();
    await waitFor(() => {
      expect(screen.queryByTestId("country-skeleton")).toBeInTheDocument();
    });
    expect(showCountrySpy.countryId).toEqual(fakeCountryId);
  });
  it("should hide the skeleton and present the correct country values", async () => {
    const { showCountrySpy } = sutFactory();
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
      `Domínio de topo: ${showCountrySpy.country.topLevelDomain}`
    );
  });
  it("should redirect to Home on error", async () => {
    const showCountrySpy = new ShowCountrySpy();
    const error = new Error("Error while fetching the country");
    jest.spyOn(showCountrySpy, "find").mockRejectedValueOnce(error);
    sutFactory(showCountrySpy);
    await waitFor(() => {
      expect(screen.queryByTestId("country-container")).not.toBeInTheDocument();
    });
    expect(history.location.pathname).toBe("/");
  });
});
