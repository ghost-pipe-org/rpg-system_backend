export class PendingSessionExistsError extends Error {
	constructor() {
		// You already have a session waiting for approve
		super("You already have a session waiting for approve");
		this.name = "PendingSessionExistsError";
	}
}
