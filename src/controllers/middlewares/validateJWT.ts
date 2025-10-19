import { env } from "@/env/index";
/// <reference path="../../@types/express.d.ts" />
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const validateJWT = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Token not provided" });
		}

		try {
			const { JWT_SECRET } = env;
			const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };

			req.user = { id: decoded.sub }; // Apenas o id do usuário

			next();
		} catch (error) {
			return res.status(401).json({ message: "Invalid token" });
		}
	};
};
