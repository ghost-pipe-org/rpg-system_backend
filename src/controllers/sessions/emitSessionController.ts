import { PendingSessionExistsError } from "@/services/errors/PendingSessionExistsError";
import { makeEmitSessionService } from "@/services/factories/makeEmitSessionService";
import type { Request, Response } from "express";

export async function emitSessionController(req: Request, res: Response) {
const creatorId = req.user!.id;

    const {
        title,
        description,
        requirements,
        system,
        possibleDates,
        period,
        minPlayers,
        maxPlayers,
    } = req.body;

    try {
        const emitSessionService = makeEmitSessionService();
        const { session } = await emitSessionService.execute({
            title,
            description,
            requirements,
            system,
            possibleDates,
            period,
            minPlayers,
            maxPlayers,
            creatorId,
        });

        return res.status(201).json({ message: "Session emitted successfully", session });
    } catch (error) {
        if (error instanceof PendingSessionExistsError) {
            return res.status(409).json({ error: error.message });
        }

        console.error("Error emitting session:", error);
        return res.status(500).json({ error: "Internal server error" });
    }


}