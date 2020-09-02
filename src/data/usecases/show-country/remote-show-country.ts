import { ShowCountry } from "@/domain/usecases";
import { LoadCountryByIdRepository } from "@/data/protocols";
import { CountryNotFoundError } from "@/domain/errors";

export class RemoteShowCountry implements ShowCountry {
  constructor(
    private readonly loadCountryRepository: LoadCountryByIdRepository
  ) {}

  async find(countryId: number): Promise<ShowCountry.Result> {
    const country = await this.loadCountryRepository.load(countryId);
    if (!country) {
      throw new CountryNotFoundError(countryId);
    }
    return null;
  }
}
