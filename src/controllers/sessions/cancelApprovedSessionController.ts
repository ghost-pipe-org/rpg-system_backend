import { NotFoundError } from "@/services/errors/notFoundError";
import { SessionCancellationWindowError } from "@/services/errors/sessionCancellationWindowError";
import { userIsNotMaster } from "@/services/errors/userIsNotMaster";
import { makeCancelApprovedSessionService } from "@/services/factories/makeCancelApprovedSessionService";
import type { Request, Response } from "express";

export async function cancelApprovedSessionController(
	req: Request,
	res: Response,
) {
	const { sessionId } = req.params;
	const masterId = (req.user as { id: string }).id;
	const { cancelEvent } = req.body;

	try {
		const cancelApprovedSessionService = makeCancelApprovedSessionService();

		const result = await cancelApprovedSessionService.execute({
			sessionId,
			userId: masterId,
			cancelEvent,
		});

		return res.status(200).json({ message: result.message });
	} catch (error) {
		if (error instanceof NotFoundError) {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof userIsNotMaster) {
			return res
				.status(403)
				.json({ message: "Apenas o mestre da sessão pode cancelá-la." });
		}
		if (error instanceof SessionCancellationWindowError) {
			return res.status(403).json({ message: error.message });
		}

		console.error("Error canceling approved session:", error);
		return res.status(500).json({ message: "Erro interno no servidor" });
	}
}
