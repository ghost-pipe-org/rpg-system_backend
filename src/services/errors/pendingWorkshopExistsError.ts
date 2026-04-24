export class PendingWorkshopExistsError extends Error {
	constructor() {
		super(
			"Você já possui uma oficina pendente de aprovação. Aguarde a análise do administrador antes de emitir outra.",
		);
		this.name = "PendingWorkshopExistsError";
	}
}
