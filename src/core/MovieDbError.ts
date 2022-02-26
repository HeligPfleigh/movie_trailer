export default class MovieDbError extends Error {
  public readonly status: number;
  public readonly message: string;

  constructor(status_code: number, status_message: string) {
    super(status_message);
    this.status = status_code;
    this.message = status_message;
  }
}
