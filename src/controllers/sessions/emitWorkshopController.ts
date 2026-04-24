import { InvalidUserError } from "@/services/errors/invalidUserError";
import { PendingWorkshopExistsError } from "@/services/errors/pendingWorkshopExistsError";
import { makeEmitWorkshopService } from "@/services/factories/makeEmitWorkshopService";
import type { Request, Response } from "express";

export async function emitWorkshopController(req: Request, res: Response) {
	const requesterId = (req.user as { id: string }).id;
	const {
		title,
		description,
		requirements,
		location,
		possibleDates,
		period,
		minPlayers,
		maxPlayers,
		facilitatorIds,
	} = req.body;

	const allFacilitatorIds: string[] = Array.from(
		new Set([requesterId, ...(facilitatorIds || [])]),
	);

	try {
		const emitWorkshopService = makeEmitWorkshopService();
		const { session } = await emitWorkshopService.execute({
			title,
			description,
			requirements,
			location,
			possibleDates: possibleDates.map((date: string) => new Date(date)),
			period,
			minPlayers,
			maxPlayers,
			facilitatorIds: allFacilitatorIds,
		});

		return res
			.status(201)
			.json({ message: "Oficina emitida com sucesso", data: session });
	} catch (error) {
		if (error instanceof PendingWorkshopExistsError) {
			return res.status(409).json({ message: error.message });
		}
		if (error instanceof InvalidUserError) {
			return res
				.status(404)
				.json({
					message: "Um dos ministrantes informados não foi encontrado.",
				});
		}

		console.error("Error emitting workshop:", error);
		return res.status(500).json({ message: "Erro interno no servidor" });
	}
}
