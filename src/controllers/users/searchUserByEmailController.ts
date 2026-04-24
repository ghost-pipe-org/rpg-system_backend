import { NotFoundError } from "@/services/errors/notFoundError";
import { makeSearchUserByEmailService } from "@/services/factories/makeSearchUserByEmailService";
import type { Request, Response } from "express";

export async function searchUserByEmailController(req: Request, res: Response) {
	const { email } = req.query;

	if (!email || typeof email !== "string") {
		return res
			.status(400)
			.json({ message: "O parâmetro 'email' é obrigatório." });
	}

	try {
		const searchUserByEmailService = makeSearchUserByEmailService();
		const { user } = await searchUserByEmailService.execute({ email });
		return res.status(200).json({ data: user });
	} catch (error) {
		if (error instanceof NotFoundError) {
			return res.status(404).json({ message: error.message });
		}
		console.error("Error searching user by email:", error);
		return res.status(500).json({ message: "Erro interno no servidor" });
	}
}
