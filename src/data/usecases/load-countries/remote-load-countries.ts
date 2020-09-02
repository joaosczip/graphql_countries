import { LoadCountries } from "@/domain/usecases";
import { LoadCountriesRepository } from "@/data/protocols";

export class RemoteLoadCountries implements LoadCountries {
  constructor(
    private readonly loadCountriesRepository: LoadCountriesRepository
  ) {}

  async load(): Promise<LoadCountries.Result> {
    await this.loadCountriesRepository.loadAll();
    return null;
  }
}
