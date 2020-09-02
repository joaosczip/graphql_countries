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
const sutFactory = (): Sut => {
  const showCountrySpy = new ShowCountrySpy();
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
});
