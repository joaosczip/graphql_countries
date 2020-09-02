import faker from "faker";
import { Country } from "../models";

export const mockCountry = (): Country => ({
  id: faker.random.uuid(),
  name: faker.address.country(),
  capital: faker.address.city(),
  flag: faker.internet.url(),
  area: faker.random.number(),
  population: faker.random.number(),
  topLevelDomain: faker.random.word(),
});
