import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { LoadCountriesRepository } from "@/data/protocols";

export class GraphqlCountriesRepository implements LoadCountriesRepository {
  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.API_URI,
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  }

  async loadAll(
    params: LoadCountriesRepository.Params
  ): Promise<LoadCountriesRepository.Result> {
    const query = gql`
      {
        Country(first: ${params.limit}, offset: ${params.offset}) {
          _id
          name
          capital
          flag {
            svgFile
          }
        }
      }
    `;

    const countriesResult = await this.client.query({
      query,
    });

    if (!countriesResult.data.length) {
      return null;
    }

    return countriesResult.data.map(({ id, name, capital, flag }) => ({
      id,
      name,
      capital,
      flag: flag.svgFile,
    }));
  }
}
