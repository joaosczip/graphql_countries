import React from "react";
import { render, screen } from "@testing-library/react";
import Home from ".";
import { LoadCountriesSpy } from "@/presentation/test";

type Sut = {
  loadCountriesSpy: LoadCountriesSpy;
};

const sutFactory = (): Sut => {
  const loadCountriesSpy = new LoadCountriesSpy();
  render(<Home loadCountries={loadCountriesSpy} />);
  return {
    loadCountriesSpy,
  };
};

describe("Home", () => {
  it("should calls LoadCountries on load", () => {
    const { loadCountriesSpy } = sutFactory();
    expect(loadCountriesSpy.callsCount).toBe(1);
    expect(loadCountriesSpy.params).toEqual({
      offset: 0,
      limit: 12,
    });
  });
  it("should renders the correct countries", async () => {
    const { loadCountriesSpy } = sutFactory();
    const container = await screen.findByTestId("container");
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
});
