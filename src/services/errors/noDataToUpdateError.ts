export class NoDataToUpdateError extends Error {
  constructor() {
    super("No valid data provided for update");
    this.name = "NoDataToUpdateError";
  }
}