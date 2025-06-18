import { Request, Response } from "express";
import { makeGetCreatorEmittedSessionsService } from "@/services/factories/makeGetCreatorEmittedSessionsService";

export async function getEmittedSessionsController(req: Request, res: Response) {
    const creatorEmittedSessionsService = makeGetCreatorEmittedSessionsService();

    try {
        const creatorId = req.user!.id;
        const { emittedSessions } = await creatorEmittedSessionsService.execute({ creatorId });

        return res.status(200).json({ emittedSessions });
    } catch (error) {
        console.error("Error fetching emitted sessions:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}