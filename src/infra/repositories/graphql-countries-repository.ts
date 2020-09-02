import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LoadCountriesRepository } from "@/data/protocols";

export class GraphqlCountriesRepository implements LoadCountriesRepository {
  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      uri: process.env.API_URI,
      cache: new InMemoryCache(),
    });
  }

  async loadAll(): Promise<LoadCountriesRepository.Result> {
    return null;
  }
}
