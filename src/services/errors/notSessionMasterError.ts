export class NotSessionMasterError extends Error {
	constructor() {
		super("Apenas o mestre criador pode cancelar a sessão.");
		this.name = "NotSessionMasterError";
	}
}
