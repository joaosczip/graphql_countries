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

describe("Country", () => {
  it("should shows country skeleton and calls ShowCountry on load with correct id", async () => {
    const showCountrySpy = new ShowCountrySpy();
    const history = createMemoryHistory({
      initialEntries: [`/country/${fakeCountryId}`],
    });
    render(
      <Router history={history}>
        <Country showCountry={showCountrySpy} />
      </Router>
    );
    await waitFor(() => {
      expect(screen.queryByTestId("country-skeleton")).toBeInTheDocument();
    });
    expect(showCountrySpy.countryId).toEqual(fakeCountryId);
  });
});
