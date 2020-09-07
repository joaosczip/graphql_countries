import { ShowCountry } from "@/domain/usecases";
import { mockCountry } from "@/domain/test";

export class ShowCountrySpy implements ShowCountry {
  countryId: number;
  callsCount = 0;
  country = mockCountry();
  async find(countryId: number): Promise<ShowCountry.Result> {
    this.callsCount++;
    this.countryId = countryId;
    return this.country;
  }
}
