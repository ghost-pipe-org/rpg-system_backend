import { makeRejectSessionService } from "@/services/factories/makeRejectSessionService";
import type { Request, Response } from "express";
import { NotFoundError } from "@/services/errors/notFoundError";
import { SessionAlreadyRejectedError } from "@/services/errors/sessionAlreadyRejectedError";


export async function rejectSessionController(req: Request, res: Response) {
    const { sessionId } = req.params;
    const userId = req.user!.id; // Assuming user ID is stored in req.user by middleware

    try {
        const rejectSessionService = makeRejectSessionService();

        await rejectSessionService.execute({
            sessionId,
            userId,
        });

        return res.status(200).json({ message: "Session rejected successfully" });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        if (error instanceof SessionAlreadyRejectedError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}
