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
		enrollment: z.string().regex(/^\d{9}$/).or(z.literal("")).optional(),
		phoneNumber: z
			.string()
			.regex(/^\+?[1-9]\d{1,14}$/, {
				message: "Phone number must be in E.164 format",
			})
			.optional(),
		masterConfirm: z.boolean().optional(), // Assuming this is not needed in the backend service
	})
	.strict();

export const validateRegister = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = registerSchema.safeParse(req.body);
	if (!result.success) {
		console.error("Validation errors:", result.error.errors);
		return res.status(400).json({ errors: result.error.errors });
	}
	next();
};
