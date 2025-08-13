import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const authenticateSchema = z
	.object({
		email: z.string().email({ message: "Invalid email address" }),
		password: z.string(),
	})
	.strict();

export const validateAuthenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = authenticateSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ errors: result.error.errors });
	}
	next();
};
