import { makeAvaliableSessionsService } from "@/services/factories/makeAvaliableSessionsService";
import type { Request, Response } from "express";

export async function getAvailableWorkshopsController(
	req: Request,
	res: Response,
) {
	const avaliableSessionsService = makeAvaliableSessionsService();

	try {
		const { sessions } = await avaliableSessionsService.execute("OFICINA");
		return res.status(200).json({ data: sessions });
	} catch (error) {
		console.error("Error fetching available workshops:", error);
		return res.status(500).json({ message: "Erro interno no servidor" });
	}
}
