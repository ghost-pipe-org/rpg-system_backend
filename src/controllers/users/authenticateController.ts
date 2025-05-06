import { makeAuthenticateService } from "@/services/factories/makeAuthenticateService";
import z from "zod";
import type { Request, Response } from "express";
import { InvalidCredentialsError } from "@/services/errors/invalidCredentialsError";

export async function authenticateController(req: Request, res: Response) {

    const { email, password } = req.body;

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
    return res.status(200).json({ message: "User authenticated successfully" });
}
