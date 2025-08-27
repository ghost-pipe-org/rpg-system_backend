export class CancelDeadlineExceededError extends Error {
    constructor() {
      super("Cancelamento só é permitido até 72 horas antes da sessão.");
      this.name = "CancelDeadlineExceededError";
    }
  }