import faker from "faker";
import { RemoteShowCountry } from "./remote-show-country";
import { LoadCountryByIdRepositorySpy } from "@/data/test";

type Sut = {
  sut: RemoteShowCountry;
  loadCountryByIdRepositorySpy: LoadCountryByIdRepositorySpy;
};

const sutFactory = (): Sut => {
  const loadCountryByIdRepositorySpy = new LoadCountryByIdRepositorySpy();
  const sut = new RemoteShowCountry(loadCountryByIdRepositorySpy);
  return {
    sut,
    loadCountryByIdRepositorySpy,
  };
};

describe("RemoteShowCountry", () => {
  it("should calls LoadCountryByIdRepository with correct country id", async () => {
    const { sut, loadCountryByIdRepositorySpy } = sutFactory();
    const fakeCountryId = faker.random.number();
    await sut.find(fakeCountryId);
    expect(loadCountryByIdRepositorySpy.callsCount).toBe(1);
    expect(loadCountryByIdRepositorySpy.countryId).toBe(fakeCountryId);
  });
  it("should throws if LoadCountryByIdRepository throws", () => {
    const { sut, loadCountryByIdRepositorySpy } = sutFactory();
    jest
      .spyOn(loadCountryByIdRepositorySpy, "load")
      .mockRejectedValueOnce(new Error());
    const result = sut.find(faker.random.number());
    expect(result).rejects.toThrow(new Error());
  });
});
