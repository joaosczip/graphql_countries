import { LoadCountriesRepository } from "@/data/protocols";

export class GraphqlCountriesRepository implements LoadCountriesRepository {
  async loadAll(): Promise<LoadCountriesRepository.Result> {
    return null;
  }
}
