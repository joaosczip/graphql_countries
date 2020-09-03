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
});
