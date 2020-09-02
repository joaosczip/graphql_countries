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

  async loadAll(): Promise<LoadCountriesRepository.Result> {
    const query = gql`
      {
        Country {
          _id
          name
          capital
          flag {
            svgFile
          }
        }
      }
    `;
    await this.client.query({ query });
    return null;
  }
}
