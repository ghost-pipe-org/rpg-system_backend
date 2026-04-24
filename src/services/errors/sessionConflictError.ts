export class SessionConflictError extends Error {
	constructor() {
		super(
			"Você já possui uma inscrição em conflito com este horário. Só é permitida uma mesa por dia e eventos do mesmo período não podem ser acumulados.",
		);
		this.name = "SessionConflictError";
	}
}
