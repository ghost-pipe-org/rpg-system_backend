import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const registerSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		email: z.string().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters long" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, { message: "Password must contain at least one number" }),
		role: z.enum(["admin", "user"]).default("user"),
	})
	.strict();

export const validateRegister = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = registerSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ message: `${result.error.errors[0].path[0]} ${result.error.errors[0].message}`});
	}
	next();
};
