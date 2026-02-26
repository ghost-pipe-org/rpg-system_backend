export class UnauthorizedSessionCancelError extends Error {
	constructor() {
		super("Unauthorized account you must be an MASTER.");
	}
}
