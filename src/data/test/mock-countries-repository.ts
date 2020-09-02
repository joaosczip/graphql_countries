import { LoadCountriesRepository } from "@/data/protocols";

export class LoadCountriesRepositorySpy implements LoadCountriesRepository {
  callsCount = 0;
  async loadAll(): Promise<LoadCountriesRepository.Result> {
    this.callsCount++;
    return null;
  }
}
