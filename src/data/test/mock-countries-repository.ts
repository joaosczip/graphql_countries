import { LoadCountriesRepository } from "@/data/protocols";
import { mockBasicCountries } from "@/domain/test";

export class LoadCountriesRepositorySpy implements LoadCountriesRepository {
  callsCount = 0;
  countries = mockBasicCountries();
  async loadAll(): Promise<LoadCountriesRepository.Result> {
    this.callsCount++;
    return Promise.resolve(this.countries);
  }
}
