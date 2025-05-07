import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/env/index";
import type { Role } from "@prisma/client";

export const validateJWT = (requiredRole?: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        try {
            const { JWT_SECRET } = env;
            const decoded = jwt.verify(token, JWT_SECRET) as { role: Role; sub: string };

            req.user = { id: decoded.sub, role: decoded.role }; // Adiciona o usuário decodificado ao request

            // Verifica a role, se necessário
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: "Access Denied" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};