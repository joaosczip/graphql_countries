import { ApolloClient, gql } from "@apollo/client/";
import { GraphqlCountriesRepository } from "./graphql-countries-repository";

jest.mock("@apollo/client");

describe("GraphqlCountriesRepository", () => {
  it("should calls apollo.query with correct data", async () => {
    const sut = new GraphqlCountriesRepository();
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
