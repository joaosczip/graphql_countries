import faker from "faker";
import { ApolloClient, gql, ApolloQueryResult } from "@apollo/client/";
import { GraphqlCountriesRepository } from "./graphql-countries-repository";
import { mockBasicCountry, mockCountry } from "@/domain/test";
import { LoadCountriesRepository } from "@/data/protocols";
import { UnexpectedError } from "@/domain/errors";

jest.mock("@apollo/client");

const sutFactory = (): GraphqlCountriesRepository =>
  new GraphqlCountriesRepository();

const mockQueryResult = (
  firstCountry = mockBasicCountry(),
  secondCountry = mockBasicCountry()
) => ({
  data: {
    Country: [
      {
        ...firstCountry,
        _id: firstCountry.id,
        flag: {
          svgFile: faker.internet.url(),
        },
      },
      {
        ...secondCountry,
        _id: secondCountry.id,
        flag: {
          svgFile: faker.internet.url(),
        },
      },
    ],
  },
});

const mockLoadQueryResult = () => {
  const { id, topLevelDomain, flag, ...country } = mockCountry();
  return {
    data: {
      Country: [
        {
          ...country,
          flag: {
            svgFile: faker.internet.url(),
          },
          topLevelDomains: [
            {
              name: faker.random.word(),
            },
          ],
        },
      ],
    },
  };
};

const makeFakeParams = (): LoadCountriesRepository.Params => ({
  offset: faker.random.number(),
  limit: faker.random.number(),
});

describe("GraphqlCountriesRepository", () => {
  describe("loadAll", () => {
    it("should calls apollo.query with correct data", async () => {
      const sut = sutFactory();
      const query = gql`
        {
          Country(first: 12, offset: 0) {
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
      querySpy.mockResolvedValueOnce(
        mockQueryResult() as ApolloQueryResult<any>
      );
      await sut.loadAll({
        offset: 0,
        limit: 12,
      });
      expect(querySpy).toHaveBeenCalledWith({ query });
    });
    it("should returns null if apollo.query dont return Country", async () => {
      const sut = sutFactory();
      jest.spyOn(ApolloClient.prototype, "query").mockResolvedValueOnce({
        data: {},
      } as ApolloQueryResult<any>);
      const result = await sut.loadAll(makeFakeParams());
      expect(result).toBeNull();
    });
    it("should returns null if apollo.query returns empty Country", async () => {
      const sut = sutFactory();
      jest.spyOn(ApolloClient.prototype, "query").mockResolvedValueOnce({
        data: {
          Country: [],
        },
      } as ApolloQueryResult<any>);
      const result = await sut.loadAll(makeFakeParams());
      expect(result).toBeNull();
    });
    it("should throws if apollo.query throws", () => {
      const sut = sutFactory();
      jest
        .spyOn(ApolloClient.prototype, "query")
        .mockRejectedValueOnce(new Error());
      const result = sut.loadAll(makeFakeParams());
      expect(result).rejects.toThrow(new Error());
    });
    it("should returns the countries on success", async () => {
      const sut = sutFactory();

      const firstCountry = mockBasicCountry();
      const secondCountry = mockBasicCountry();

      const basicCountries = mockQueryResult(firstCountry, secondCountry);

      jest
        .spyOn(ApolloClient.prototype, "query")
        .mockResolvedValueOnce(basicCountries as ApolloQueryResult<any>);

      const result = await sut.loadAll(makeFakeParams());

      const expected = [
        { ...firstCountry, flag: basicCountries.data.Country[0].flag.svgFile },
        { ...secondCountry, flag: basicCountries.data.Country[1].flag.svgFile },
      ];
      expect(result).toEqual(expected);
    });
  });
  describe("load", () => {
    it("should calls apollo.query with correct data", async () => {
      const sut = sutFactory();
      const countryId = faker.random.number();
      const query = gql`
        {
          Country(_id: ${countryId}) {
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
      const querySpy = jest.spyOn(ApolloClient.prototype, "query");
      querySpy.mockResolvedValueOnce(
        mockLoadQueryResult() as ApolloQueryResult<any>
      );
      await sut.load(countryId);
      expect(querySpy).toHaveBeenCalledWith({ query });
    });
    it.only("should throws UnexpectedError if apollo.client throws", () => {
      const sut = sutFactory();
      const countryId = faker.random.number();
      jest
        .spyOn(ApolloClient.prototype, "query")
        .mockRejectedValueOnce(new Error());
      const result = sut.load(countryId);
      expect(result).rejects.toThrow(new UnexpectedError());
    });
  });
});
