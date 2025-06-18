import { Request, Response } from "express";
import { makeGetUserEnrolledSessionsService } from "@/services/factories/makeGetUserEnrolledSessionsService";

export async function getEnrolledSessionsController(req: Request, res: Response) {
    const getUserEnrolledSessionsService = makeGetUserEnrolledSessionsService();

    try {
        const userId = req.user!.id;
        const { enrolledSessions } = await getUserEnrolledSessionsService.execute({ userId });

        return res.status(200).json({ enrolledSessions });
    } catch (error) {
        console.error("Error fetching enrolled sessions:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}