import { makeAuthenticateService } from "@/services/factories/makeAuthenticateService";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { InvalidCredentialsError } from "@/services/errors/invalidCredentialsError";
import { env } from "@/env/index";

export async function authenticateController(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const authenticateService = makeAuthenticateService();

		const { user } = await authenticateService.execute({
			email,
			password,
		});

		const { JWT_SECRET } = env;

		const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "User authenticated successfully", token });

	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Internal server error" });
	}
}
