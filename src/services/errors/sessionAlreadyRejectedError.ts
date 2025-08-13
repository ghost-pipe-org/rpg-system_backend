export class SessionAlreadyRejectedError extends Error {
	constructor() {
		super("Session already rejected.");
		this.name = "SessionAlreadyRejectedError";
	}
}
