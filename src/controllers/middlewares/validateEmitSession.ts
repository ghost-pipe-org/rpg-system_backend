import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const emitSessionSquema = z
	.object({
		title: z.string().min(1, { message: "Title is required" }),
		description: z.string().min(1, { message: "Description is required" }),
		requirements: z.string().optional(),
		system: z.string().min(1, { message: "System is required" }),
		possibleDates: z
			.array(z.string().datetime())
			.min(1, { message: "At least one date is required" }),
		period: z.enum(["MANHA", "TARDE", "NOITE"], {
			message: "Period must be MANHA, TARDE, or NOITE",
		}),
		minPlayers: z
			.number()
			.int()
			.min(1, { message: "Minimum players must be at least 1" }),
		maxPlayers: z
			.number()
			.int()
			.min(1, { message: "Maximum players must be at least 1" }),
		location: z.string().min(1, { message: "Location is required" }),
	})
	.strict();

export const validateEmitSession = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = emitSessionSquema.safeParse(req.body);
	if (!result.success) {
		console.error("Validation errors:", result.error.errors);
		return res.status(400).json({ errors: result.error.errors });
	}
	next();
};
