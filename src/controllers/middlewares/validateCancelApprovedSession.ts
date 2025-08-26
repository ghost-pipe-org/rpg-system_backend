import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const cancelSessionSchema = z.object({
	cancelEvent: z.string().min(1, "Justificativa é obrigatória")
});

export async function validateCancelApprovedSession(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		cancelSessionSchema.parse(req.body);
		next();
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				error: "Dados inválidos",
				details: error.errors
			});
		}
		next(error);
	}
}