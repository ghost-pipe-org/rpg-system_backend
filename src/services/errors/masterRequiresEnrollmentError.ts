export class MasterRequiresEnrollmentError extends Error {
	constructor() {
		super("Para se registrar como mestre, é necessário fornecer a matrícula.");
		this.name = "MasterRequiresEnrollmentError";
	}
}
