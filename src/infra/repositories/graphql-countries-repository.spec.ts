import { ApolloClient, gql } from "@apollo/client/";
import { GraphqlCountriesRepository } from "./graphql-countries-repository";

jest.mock("@apollo/client");

const sutFactory = (): GraphqlCountriesRepository =>
  new GraphqlCountriesRepository();

describe("GraphqlCountriesRepository", () => {
  it("should calls apollo.query with correct data", async () => {
    const sut = sutFactory();
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
    const querySpy = jest.spyOn(ApolloClient.prototype, "query");
    await sut.loadAll();
    expect(querySpy).toHaveBeenCalledWith({ query });
  });
});
