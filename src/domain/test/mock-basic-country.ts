import faker from "faker";
import { BasicCountry } from "@/domain/models";

export const mockBasicCountry = (): BasicCountry => ({
  id: faker.random.uuid(),
  name: faker.address.country(),
  capital: faker.address.city(),
  flag: faker.internet.url(),
});

export const mockBasicCountries = (): BasicCountry[] => [
  mockBasicCountry(),
  mockBasicCountry(),
];
