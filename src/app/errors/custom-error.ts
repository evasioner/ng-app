export class CustomError extends Error {
  public status: number;

  constructor(message) {
    super(message);
    this.name = 'UserError';
    this.status = 200;
  }
}
