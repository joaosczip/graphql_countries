import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import {
  LoadCountriesRepository,
  LoadCountryByIdRepository,
} from "@/data/protocols";
import { UnexpectedError } from "@/domain/errors";

export class GraphqlCountriesRepository
  implements LoadCountriesRepository, LoadCountryByIdRepository {
  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.REACT_APP_API_URI,
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  }

  async loadAll(
    params: LoadCountriesRepository.Params
  ): Promise<LoadCountriesRepository.Result> {
    try {
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

      if (!countriesResult.data.Country?.length) {
        return null;
      }

      return countriesResult.data.Country.map(
        ({ _id, name, capital, flag }) => ({
          id: _id,
          name,
          capital,
          flag: flag.svgFile,
        })
      );
    } catch {
      throw new UnexpectedError();
    }
  }

  async load(countryId: number): Promise<LoadCountryByIdRepository.Result> {
    try {
      const query = gql`
        {
          Country(_id: "${countryId}") {
            name
            area
            population
            capital
            flag {
              svgFile
            }
            topLevelDomains {
              name
            }
          }
        }
      `;

      const queryResult = await this.client.query({ query });
      if (!queryResult.data.Country.length) {
        return null;
      }

      const { topLevelDomains, flag, ...country } = queryResult.data.Country[0];

      return {
        ...country,
        id: countryId,
        flag: flag.svgFile,
        topLevelDomains: topLevelDomains[0].name,
      };
    } catch {
      throw new UnexpectedError();
    }
  }

  async loadBy({
    name,
  }: LoadCountriesRepository.LoadByParams): Promise<
    LoadCountriesRepository.Result
  > {
    try {
      const capitalize = (value: string) =>
        value.charAt(0).toUpperCase() + value.slice(1);

      const query = gql`
        {
          Country(filter: { name_starts_with: ${capitalize(name)} }) {
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
    } catch {
      throw new UnexpectedError();
    }
  }
}
