import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const approveSessionSchema = z
	.object({
		approvedDate: z.string().datetime({
			message: "ApprovedDate must be a valid ISO datetime string",
		}),
		location: z.string().min(1, { message: "Location is required" }),
	})
	.strict();

export const validateApproveSession = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = approveSessionSchema.safeParse(req.body);
	if (!result.success) {
		console.error("Validation errors:", result.error.errors);
		return res.status(400).json({ errors: result.error.errors });
	}
	next();
};
