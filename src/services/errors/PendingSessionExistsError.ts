export class PendingSessionExistsError extends Error {
	constructor() {
		super("Você já possui uma sessão pendente para aprovação.");
		this.name = "PendingSessionExistsError";
	}
}
