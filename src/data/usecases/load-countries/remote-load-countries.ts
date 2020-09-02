import { LoadCountries } from "@/domain/usecases";
import { LoadCountriesRepository } from "@/data/protocols";
import { CountriesNotFoundError } from "@/domain/errors";

export class RemoteLoadCountries implements LoadCountries {
  private readonly defaultLimit = 12;

  constructor(
    private readonly loadCountriesRepository: LoadCountriesRepository
  ) {}

  async load(params: LoadCountries.Params): Promise<LoadCountries.Result> {
    const countries = await this.loadCountriesRepository.loadAll({
      offset: params.offset,
      limit: params.limit ?? this.defaultLimit,
    });

    if (!countries) {
      throw new CountriesNotFoundError();
    }

    return countries;
  }
}
