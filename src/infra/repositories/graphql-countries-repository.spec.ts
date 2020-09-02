import faker from "faker";
import { ApolloClient, gql, ApolloQueryResult } from "@apollo/client/";
import { GraphqlCountriesRepository } from "./graphql-countries-repository";
import { mockBasicCountry } from "@/domain/test";

jest.mock("@apollo/client");

const sutFactory = (): GraphqlCountriesRepository =>
  new GraphqlCountriesRepository();

const mockQueryResult = (
  firstCountry = mockBasicCountry(),
  secondCountry = mockBasicCountry()
) => [
  {
    ...firstCountry,
    flag: {
      svgFile: faker.internet.url(),
    },
  },
  {
    ...secondCountry,
    flag: {
      svgFile: faker.internet.url(),
    },
  },
];

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
    querySpy.mockResolvedValueOnce({
      data: mockQueryResult(),
    } as ApolloQueryResult<any>);
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
  it("should returns the countries on success", async () => {
    const sut = sutFactory();

    const firstCountry = mockBasicCountry();
    const secondCountry = mockBasicCountry();

    const basicCountries = mockQueryResult(firstCountry, secondCountry);

    jest
      .spyOn(ApolloClient.prototype, "query")
      .mockResolvedValueOnce({ data: basicCountries } as ApolloQueryResult<
        any
      >);

    const result = await sut.loadAll();

    const expected = [
      { ...firstCountry, flag: basicCountries[0].flag.svgFile },
      { ...secondCountry, flag: basicCountries[1].flag.svgFile },
    ];
    expect(result).toEqual(expected);
  });
});
