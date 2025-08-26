export class CancelJustificationRequiredError extends Error {
    constructor() {
      super("Justificativa é obrigatória para cancelamento.");
      this.name = "CancelJustificationRequiredError";
    }
  }