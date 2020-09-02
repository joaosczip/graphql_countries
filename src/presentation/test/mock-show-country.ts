import { ShowCountry } from "@/domain/usecases";
import { mockCountry } from "@/domain/test";

export class ShowCountrySpy implements ShowCountry {
  countryId: number;
  country = mockCountry();
  async find(countryId: number): Promise<ShowCountry.Result> {
    this.countryId = countryId;
    return this.country;
  }
}
