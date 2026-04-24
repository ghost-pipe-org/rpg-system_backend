import { makeGetAllSessionsService } from "@/services/factories/makeGetAllSessionsService";
import type { Request, Response } from "express";

export async function getAllSessionsController(req: Request, res: Response) {
	const getAllSessionsService = makeGetAllSessionsService();

	try {
		const { sessions } = await getAllSessionsService.execute("MESA");
		return res.status(200).json({ data: sessions });
	} catch (error) {
		console.error("Error fetching sessions:", error);
		return res.status(500).json({ message: "Erro interno no servidor" });
	}
}
