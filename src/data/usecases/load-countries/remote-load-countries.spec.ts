import { RemoteLoadCountries } from "./remote-load-countries";
import { LoadCountriesRepository } from "@/data/protocols";

class LoadCountriesRepositorySpy implements LoadCountriesRepository {
  callsCount = 0;
  async loadAll(): Promise<LoadCountriesRepository.Result> {
    this.callsCount++;
    return null;
  }
}

describe("RemoteLoadCountries", () => {
  it("should calls the LoadCountriesRepository", async () => {
    const loadCountriesRepositorySpy = new LoadCountriesRepositorySpy();
    const sut = new RemoteLoadCountries(loadCountriesRepositorySpy);
    await sut.load();
    expect(loadCountriesRepositorySpy.callsCount).toBe(1);
  });
});
