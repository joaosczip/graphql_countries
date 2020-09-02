export class UnexpectedError extends Error {
  constructor() {
    super("Ops! Ocorreu um erro inesperado. Por favor tente novamente.");
    this.name = "UnexpectedError";
  }
}
