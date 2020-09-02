import React from "react";
import { render } from "@testing-library/react";
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
});
