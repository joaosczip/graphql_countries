import faker from "faker";
import { RemoteFindCountries } from "./remote-find-countries";
import { LoadCountriesRepositorySpy } from "@/data/test";
import { FindCountries } from "@/domain/usecases";

const makeFakeParams = (): FindCountries.Params => ({
  name: faker.address.country(),
});

type Sut = {
  sut: RemoteFindCountries;
  loadCountriesRepositorySpy: LoadCountriesRepositorySpy;
};

const sutFactory = (): Sut => {
  const loadCountriesRepositorySpy = new LoadCountriesRepositorySpy();
  const sut = new RemoteFindCountries(loadCountriesRepositorySpy);
  return {
    sut,
    loadCountriesRepositorySpy,
  };
};

describe("RemoteFindCountries", () => {
  it("should calls LoadCountriesRepository with correct params", async () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    const params = makeFakeParams();
    await sut.find(params);
    expect(loadCountriesRepositorySpy.params).toEqual(params);
  });
  it("should throws if LoadCountriesRepository throws", () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    const error = new Error();
    jest
      .spyOn(loadCountriesRepositorySpy, "loadBy")
      .mockRejectedValueOnce(error);
    const result = sut.find(makeFakeParams());
    expect(result).rejects.toThrow(error);
  });
  it("should returns an empty array if LoadCountriesRepository returns null", async () => {
    const { sut, loadCountriesRepositorySpy } = sutFactory();
    loadCountriesRepositorySpy.countries = null;
    const result = await sut.find(makeFakeParams());
    expect(result).toEqual([]);
  });
});
