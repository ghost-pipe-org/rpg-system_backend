import { makeGetFacilitatedWorkshopsService } from "@/services/factories/makeGetFacilitatedWorkshopsService";
import type { Request, Response } from "express";

export async function getFacilitatedWorkshopsController(
	req: Request,
	res: Response,
) {
	try {
		const userId = (req.user as { id: string }).id;
		const getFacilitatedWorkshopsService = makeGetFacilitatedWorkshopsService();
		const { workshops } = await getFacilitatedWorkshopsService.execute({
			userId,
		});
		return res.status(200).json({ data: workshops });
	} catch (error) {
		console.error("Error fetching facilitated workshops:", error);
		return res.status(500).json({ message: "Erro interno no servidor" });
	}
}
