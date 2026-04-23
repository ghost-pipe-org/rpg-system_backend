export class SessionCancellationWindowError extends Error {
	constructor() {
		super(
			"Não é possível cancelar a sessão com menos de 48 horas de antecedência.",
		);
		this.name = "SessionCancellationWindowError";
	}
}
