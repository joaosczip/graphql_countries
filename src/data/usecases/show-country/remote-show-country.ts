import { ShowCountry } from "@/domain/usecases";
import { LoadCountryByIdRepository } from "@/data/protocols";

export class RemoteShowCountry implements ShowCountry {
  constructor(
    private readonly loadCountryRepository: LoadCountryByIdRepository
  ) {}

  async find(countryId: number): Promise<ShowCountry.Result> {
    await this.loadCountryRepository.load(countryId);
    return null;
  }
}
