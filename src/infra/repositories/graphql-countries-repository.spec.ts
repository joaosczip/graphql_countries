import { ApolloClient, gql, ApolloQueryResult } from "@apollo/client/";
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
  it("should returns null if apollo.query returns empty", async () => {
    const sut = sutFactory();
    jest.spyOn(ApolloClient.prototype, "query").mockResolvedValueOnce({
      data: [],
    } as ApolloQueryResult<any>);
    const result = await sut.loadAll();
    expect(result).toBeNull();
  });
  it("should throws if apollo.query throws", () => {
    const sut = sutFactory();
    jest
      .spyOn(ApolloClient.prototype, "query")
      .mockRejectedValueOnce(new Error());
    const result = sut.loadAll();
    expect(result).rejects.toThrow(new Error());
  });
});
