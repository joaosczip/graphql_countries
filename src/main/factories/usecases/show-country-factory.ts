import { ShowCountry } from "@/domain/usecases";
import { RemoteShowCountry } from "@/data/usecases";
import { countriesRepositoryFactory } from "@/main/factories/infra";

export const showCountryFactory = (): ShowCountry => {
  return new RemoteShowCountry(countriesRepositoryFactory());
};
