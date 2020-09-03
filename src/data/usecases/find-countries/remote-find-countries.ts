import { FindCountries } from "@/domain/usecases";
import { LoadCountriesRepository } from "@/data/protocols";

export class RemoteFindCountries implements FindCountries {
  constructor(
    private readonly loadCountriesRepository: LoadCountriesRepository
  ) {}

  async find({ name }: FindCountries.Params): Promise<FindCountries.Result> {
    await this.loadCountriesRepository.loadBy({ name });
    return [];
  }
}
