export class NotApprovedSessionError extends Error {
	constructor() {
		super("Apenas sessões aprovadas podem ser canceladas.");
		this.name = "NotApprovedSessionError";
	}
}