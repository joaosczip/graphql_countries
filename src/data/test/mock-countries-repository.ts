import {
  LoadCountriesRepository,
  LoadCountryByIdRepository,
} from "@/data/protocols";
import { mockBasicCountries, mockCountry } from "@/domain/test";

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

export class LoadCountryByIdRepositorySpy implements LoadCountryByIdRepository {
  callsCount = 0;
  countryId: number;
  country = mockCountry();
  async load(countryId: number): Promise<LoadCountryByIdRepository.Result> {
    this.callsCount++;
    this.countryId = countryId;
    return this.country;
  }
}
