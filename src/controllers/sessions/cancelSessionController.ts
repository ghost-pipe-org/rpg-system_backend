import { SessionNotPending } from "@/services/errors/SessionNotPending";
import { NotFoundError } from "@/services/errors/notFoundError";
import { userIsNotMaster } from "@/services/errors/userIsNotMaster";
import { makeCancelSessionService } from "@/services/factories/makeCancelSessionService";
import type { Request, Response } from "express";

export async function cancelPendingSessionController(
	req: Request,
	res: Response,
) {
	try {
		const cancelSessionService = makeCancelSessionService();
		const userId = (req.user as { id: string }).id;
		const { sessionId } = req.params;

		// possivel erro com os parametros trocados/invertidos
		const result = await cancelSessionService.execute({ sessionId, userId });

		return res.status(200).json({ message: result.message });
	} catch (error) {
		if (error instanceof NotFoundError) {
			return res.status(404).json({ message: error.message });
		}

		if (error instanceof SessionNotPending) {
			return res.status(400).json({
				message: "A sessão não está pendente e não pode ser cancelada",
			});
		}

		if (error instanceof userIsNotMaster) {
			return res
				.status(403)
				.json({ message: "Apenas o mestre da sessão pode cancelá-la" });
		}

		console.error(error);
		return res.status(500).json({ message: "Erro interno no servidor" });
	}
}
