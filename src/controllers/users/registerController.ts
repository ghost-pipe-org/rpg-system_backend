import { MasterRequiresEnrollmentError } from "@/services/errors/masterRequiresEnrollmentError";
import { UserAlreadyExistsError } from "@/services/errors/userAlreadyExistsError";
import { makeRegisterService } from "@/services/factories/makeRegisterService";
import type { Request, Response } from "express";
import z from "zod";

export async function registerController(req: Request, res: Response) {
	const { name, email, password, enrollment, phoneNumber, masterConfirm } =
		req.body;

	try {
		const registerService = makeRegisterService();

		await registerService.execute({
			name,
			email,
			password,
			enrollment,
			phoneNumber,
			masterConfirm,
		});
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return res.status(409).json({ message: error.message });
		}
		if (error instanceof MasterRequiresEnrollmentError) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Internal server error" });
	}
	return res.status(201).json({ message: "User registered successfully" });
}
