export class NotEnrolledError extends Error {
	constructor() {
		super("User is not enrolled in this session.");
		this.name = "NotEnrolledError";
	}
}
