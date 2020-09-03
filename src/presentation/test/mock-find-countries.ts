import { FindCountries } from "@/domain/usecases";
import { mockBasicCountries } from "@/domain/test";

export class FindCountriesSpy implements FindCountries {
  params: any;
  countries = mockBasicCountries();
  callsCount = 0;
  async find(params: FindCountries.Params): Promise<FindCountries.Result> {
    this.callsCount++;
    this.params = params;
    return this.countries;
  }
}
