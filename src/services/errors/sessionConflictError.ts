export class SessionConflictError extends Error {
	constructor() {
		super("Você já está inscrito em uma sessão neste mesmo dia e período.");
		this.name = "SessionConflictError";
	}
}
