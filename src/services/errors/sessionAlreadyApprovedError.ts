export class SessionAlreadyApprovedError extends Error {
	constructor() {
		super("Session already approved.");
		this.name = "SessionAlreadyApprovedError";
	}
}
