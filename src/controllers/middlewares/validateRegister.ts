import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

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
			.regex(/[0-9]/, { message: "Password must contain at least one number" }),
		enrollment: z
			.string()
			.regex(/^\d{9}$/)
			.or(z.literal(""))
			.optional(),
		phoneNumber: z
			.string()
			.regex(/^[1-9]{2}9?\d{8}$/, {
				message: "Phone number must be in format: 83999999999 (area code + number)",
			})
			.optional(),
		masterConfirm: z.boolean().optional(),
	})
	.strict()
	.refine(
		(data) => {
			// Se masterConfirm for true, enrollment deve ser obrigatório e válido
			if (data.masterConfirm === true) {
				return (
					data.enrollment &&
					data.enrollment.length === 9 &&
					/^\d{9}$/.test(data.enrollment)
				);
			}
			return true;
		},
		{
			message:
				"Para se registrar como mestre, é necessário fornecer uma matrícula válida de 9 dígitos",
			path: ["enrollment"],
		},
	);

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
