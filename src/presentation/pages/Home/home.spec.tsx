import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from ".";
import { LoadCountriesSpy } from "@/presentation/test";

type Sut = {
  loadCountriesSpy: LoadCountriesSpy;
};

const sutFactory = (loadCountriesSpy = new LoadCountriesSpy()): Sut => {
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
    const error = new Error("Error loading countries");
    jest.spyOn(loadCountriesSpy, "load").mockRejectedValueOnce(error);

    sutFactory(loadCountriesSpy);

    const container = await screen.findByTestId("countries-container");
    expect(container.children).toHaveLength(0);

    expect(await screen.findByTestId("error-container")).toBeInTheDocument();
    expect(await screen.findByTestId("error-message")).toHaveTextContent(
      error.message
    );
    expect(await screen.findByTestId("reload")).toBeInTheDocument();
  });
  it("should display nothing on countries is empty", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    loadCountriesSpy.countries = [];
    sutFactory(loadCountriesSpy);
    const container = await screen.findByTestId("countries-container");
    expect(container.children).toHaveLength(0);
  });
  it("should calls LoadCountries on reload button click", async () => {
    const loadCountriesSpy = new LoadCountriesSpy();
    const error = new Error("Error loading countries");
    jest.spyOn(loadCountriesSpy, "load").mockRejectedValueOnce(error);

    sutFactory(loadCountriesSpy);

    const reloadButton = await screen.findByTestId("reload");
    reloadButton.click();
    expect(loadCountriesSpy.callsCount).toBe(1);
  });
  it("should calls LoadCountries with different offset on scroll", async () => {
    const { loadCountriesSpy } = sutFactory();
    fireEvent.scroll(window, { y: 1000 });
    await screen.findByTestId("countries-container");
    expect(loadCountriesSpy.callsCount).toBe(2);
    expect(loadCountriesSpy.params).toEqual({
      offset: 12,
      limit: 12,
    });
  });
});
