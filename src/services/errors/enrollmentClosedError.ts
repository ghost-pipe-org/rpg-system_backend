export class EnrollmentClosedError extends Error {
	constructor() {
		super("As inscrições para esta sessão já foram encerradas.");
		this.name = "EnrollmentClosedError";
	}
}
