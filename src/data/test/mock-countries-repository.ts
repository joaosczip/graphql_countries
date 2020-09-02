import { LoadCountriesRepository } from "@/data/protocols";
import { mockBasicCountries } from "@/domain/test";

export class LoadCountriesRepositorySpy implements LoadCountriesRepository {
  callsCount = 0;
  params: any;
  countries = mockBasicCountries();
  async loadAll(
    params: LoadCountriesRepository.Params
  ): Promise<LoadCountriesRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.countries);
  }
}
