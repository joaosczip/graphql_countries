import { RemoteLoadCountries } from "./remote-load-countries";
import { LoadCountriesRepositorySpy } from "@/data/test";

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
});
