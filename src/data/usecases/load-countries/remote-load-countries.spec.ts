import { RemoteLoadCountries } from "./remote-load-countries";
import { LoadCountriesRepositorySpy } from "@/data/test";
import { CountriesNotFoundError } from "@/domain/errors";

type Sut = {
  sut: RemoteLoadCountries;
  loadCountriesRepositorySpy: LoadCountriesRepositorySpy;
};

const sutFactory = (): Sut => {
  const loadCountriesRepositorySpy = new LoadCountriesRepositorySpy();
  const sut = new RemoteLoadCountries(loadCountriesRepositorySpy);
  return {
    sut,
    loadCountriesRepositorySpy,
  };
};

describe("RemoteLoadCountries", () => {
  it("should calls the LoadCountriesRepository", async () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    await sut.load();
    expect(loadCountriesRepositorySpy.callsCount).toBe(1);
  });
  it("should throws if LoadCountriesRepository throws", () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    jest
      .spyOn(loadCountriesRepositorySpy, "loadAll")
      .mockRejectedValueOnce(new Error());
    const result = sut.load();
    expect(result).rejects.toThrow(new Error());
  });
  it("should throws CountriesNotFoundError if LoadCountriesRepository returns null", () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    loadCountriesRepositorySpy.countries = null;
    const result = sut.load();
    expect(result).rejects.toThrow(new CountriesNotFoundError());
  });
});
