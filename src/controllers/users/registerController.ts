import { UserAlreadyExistsError } from "@/services/errors/userAlreadyExistsError";
import { makeRegisterService } from "@/services/factories/makeRegisterService";
import z from "zod";
import type { Request, Response } from "express";

export async function registerController(req: Request, res: Response) {
	const registerSchema = z.object({
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
	});

	const { name, email, password, role } = registerSchema.parse(req.body);

	try {
		const registerService = makeRegisterService();

		await registerService.execute({
			name,
			email,
			password,
			role,
		});

	} catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(201).json({ message: "User registered successfully" });
}
