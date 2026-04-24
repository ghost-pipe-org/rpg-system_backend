export class PendingSessionExistsError extends Error {
	constructor() {
		super(
			"Você já possui uma mesa pendente de aprovação. Aguarde a análise do administrador antes de emitir outra.",
		);
		this.name = "PendingSessionExistsError";
	}
}
