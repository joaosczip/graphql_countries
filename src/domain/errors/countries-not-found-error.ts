export class CountriesNotFoundError extends Error {
  constructor() {
    super("Ops! Nenhum país foi encontrado.");
    this.name = "CountriesNotFoundError";
  }
}
