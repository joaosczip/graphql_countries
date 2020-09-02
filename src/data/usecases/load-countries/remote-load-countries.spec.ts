import faker from "faker";
import { RemoteLoadCountries } from "./remote-load-countries";
import { LoadCountriesRepositorySpy } from "@/data/test";
import { CountriesNotFoundError } from "@/domain/errors";
import { LoadCountries } from "@/domain/usecases";

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

const makeFakeParams = (): LoadCountries.Params => ({
  offset: faker.random.number(),
  limit: faker.random.number(),
});

describe("RemoteLoadCountries", () => {
  it("should calls the LoadCountriesRepository with correct values", async () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    const params = makeFakeParams();
    await sut.load(params);
    expect(loadCountriesRepositorySpy.callsCount).toBe(1);
    expect(loadCountriesRepositorySpy.params).toEqual(params);
  });
  it("should throws if LoadCountriesRepository throws", () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    jest
      .spyOn(loadCountriesRepositorySpy, "loadAll")
      .mockRejectedValueOnce(new Error());
    const result = sut.load(makeFakeParams());
    expect(result).rejects.toThrow(new Error());
  });
  it("should throws CountriesNotFoundError if LoadCountriesRepository returns null", () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    loadCountriesRepositorySpy.countries = null;
    const result = sut.load(makeFakeParams());
    expect(result).rejects.toThrow(new CountriesNotFoundError());
  });
  it("should returns the countries on success", async () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    const result = await sut.load(makeFakeParams());
    expect(result).toEqual(loadCountriesRepositorySpy.countries);
  });
});
