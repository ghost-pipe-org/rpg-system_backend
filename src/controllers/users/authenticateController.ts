import { makeAuthenticateService } from "@/services/factories/makeAuthenticateService";
import z from "zod";
import type { Request, Response } from "express";
import { InvalidCredentialsError } from "@/services/errors/invalidCredentialsError";

export async function authenticateController(req: Request, res: Response) {
    const authenticateSchema = z.object({
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
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
    });

    const { email, password } = authenticateSchema.parse(req.body);

    try {
        const authenticateService = makeAuthenticateService();

        await authenticateService.execute({
            email,
            password,
        });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200);
}
