import { makeApproveSessionService } from "@/services/factories/makeApproveSessionSevice";
import type { Request, Response } from "express";
import { NotFoundError } from "@/services/errors/notFoundError";
import { SessionAlreadyApprovedError } from "@/services/errors/sessionAlreadyApprovedError";


export async function approveSessionController(req: Request, res: Response) {
    const { sessionId } = req.params;
    const userId = req.user!.id;

    try {
        const approveSessionService = makeApproveSessionService();

        await approveSessionService.execute({
            sessionId,
            userId,
        });

        return res.status(200).json({ message: "Session Approved successfully" });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        if (error instanceof SessionAlreadyApprovedError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}
