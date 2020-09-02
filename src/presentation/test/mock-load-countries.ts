import { LoadCountries } from "@/domain/usecases";
import { mockBasicCountries } from "@/domain/test";

export class LoadCountriesSpy implements LoadCountries {
  callsCount = 0;
  params: any;
  countries = mockBasicCountries();
  async load(params: LoadCountries.Params): Promise<LoadCountries.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.countries);
  }
}
