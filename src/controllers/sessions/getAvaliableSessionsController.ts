import { makeAvaliableSessionsService } from "@/services/factories/makeAvaliableSessionsService";
import type { Request, Response } from "express";

export async function getAvaliableSessionsController(
	req: Request,
	res: Response,
) {
	const avaliableSessionsService = makeAvaliableSessionsService();

	try {
		const { sessions } = await avaliableSessionsService.execute();
		return res.status(200).json({ sessions });
	} catch (error) {
		console.error("Error fetching available sessions:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
