export class CountryNotFoundError extends Error {
  constructor(countryId: number) {
    super(`País com ID ${countryId} não foi encontrado.`);
    this.name = "CountryNotFoundError";
  }
}
