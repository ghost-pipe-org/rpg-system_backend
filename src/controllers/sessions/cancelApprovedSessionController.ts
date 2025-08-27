import { Request, Response } from "express";
import { makeCancelApprovedSessionService } from "../../services/factories/makeCancelApprovedSessionService";
import { CancelDeadlineExceededError } from "../../services/errors/cancelDeadlineExceededError";
import { CancelJustificationRequiredError } from "../../services/errors/cancelJustificationRequiredError";
import { NotSessionMasterError } from "../../services/errors/notSessionMasterError";
import { NotApprovedSessionError } from "../../services/errors/notApprovedSessionError";

export class CancelApprovedSessionController {
	async handle(req: Request, res: Response) {
		const { sessionId } = req.params;
		const { cancelEvent } = req.body;
		const masterId = req.user.id;

		try {
			const cancelApprovedSessionService = makeCancelApprovedSessionService();
			
			const updatedSession = await cancelApprovedSessionService.execute({
				sessionId,
				masterId,
				cancelEvent
			});

			return res.json(updatedSession);
		} catch (error) {
			// Tratamento específico para cada tipo de erro
			if (error instanceof CancelDeadlineExceededError) {
				return res.status(400).json({ error: error.message });
			}
			
			if (error instanceof CancelJustificationRequiredError) {
				return res.status(400).json({ error: error.message });
			}
			
			if (error instanceof NotSessionMasterError) {
				return res.status(403).json({ error: error.message });
			}
			
			if (error instanceof NotApprovedSessionError) {
				return res.status(400).json({ error: error.message });
			}
			
			if (error.message === "Sessão não encontrada") {
				return res.status(404).json({ error: error.message });
			}
			
			// Para erros não esperados
			console.error("Unexpected error in cancelApprovedSessionController:", error);
			return res.status(500).json({ error: "Erro interno do servidor" });
		}
	}
}