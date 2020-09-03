import { FindCountries } from "@/domain/usecases";
import { mockBasicCountries } from "@/domain/test";

export class FindCountriesSpy implements FindCountries {
  params: any;
  countries = mockBasicCountries();
  async find(params: FindCountries.Params): Promise<FindCountries.Result> {
    this.params = params;
    return this.countries;
  }
}
