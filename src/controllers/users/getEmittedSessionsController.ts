import type { AuthenticatedRequest } from "@/@types/express";
import { makeGetMasterEmittedSessionsService } from "@/services/factories/makeGetMasterEmittedSessionsService";
import type { Response } from "express";

export async function getEmittedSessionsController(
	req: AuthenticatedRequest,
	res: Response,
) {
	const masterEmittedSessionsService = makeGetMasterEmittedSessionsService();

	try {
		const masterId = req.user.id; // Agora TypeScript sabe que sempre existe
		const { emittedSessions } = await masterEmittedSessionsService.execute({
			masterId,
		});

		return res.status(200).json({ emittedSessions });
	} catch (error) {
		console.error("Error fetching emitted sessions:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
