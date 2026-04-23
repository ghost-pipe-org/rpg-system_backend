export class EnrollmentCancellationWindowError extends Error {
	constructor() {
		super("Não é possível cancelar a inscrição com menos de 24 horas de antecedência.");
		this.name = "EnrollmentCancellationWindowError";
	}
}
