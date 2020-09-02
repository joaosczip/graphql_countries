import faker from "faker";
import { RemoteShowCountry } from "./remote-show-country";
import { LoadCountryByIdRepositorySpy } from "@/data/test";

describe("RemoteShowCountry", () => {
  it("should calls LoadCountryByIdRepository with correct country id", async () => {
    const loadCountryByIdRepositorySpy = new LoadCountryByIdRepositorySpy();
    const sut = new RemoteShowCountry(loadCountryByIdRepositorySpy);
    const fakeCountryId = faker.random.number();
    await sut.find(fakeCountryId);
    expect(loadCountryByIdRepositorySpy.callsCount).toBe(1);
    expect(loadCountryByIdRepositorySpy.countryId).toBe(fakeCountryId);
  });
});
