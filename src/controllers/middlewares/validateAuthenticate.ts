import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

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
		return res.status(400).json({ message: `${result.error.errors[0].path[0]} ${result.error.errors[0].message}`});
	}
	next();
};
