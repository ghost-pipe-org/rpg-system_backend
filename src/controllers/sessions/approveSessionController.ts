import { NotFoundError } from "@/services/errors/notFoundError";
import { SessionAlreadyApprovedError } from "@/services/errors/sessionAlreadyApprovedError";
import { makeApproveSessionService } from "@/services/factories/makeApproveSessionService";
import type { Request, Response } from "express";

export async function approveSessionController(req: Request, res: Response) {
	const { sessionId } = req.params;
	const { approvedDate, location } = req.body;
	const userId = (req.user as { id: string }).id;

	try {
		const approveSessionService = makeApproveSessionService();

		await approveSessionService.execute({
			sessionId,
			userId,
			approvedDate: new Date(approvedDate),
			location,
		});

		return res.status(200).json({ message: "Session Approved successfully" });
	} catch (error) {
		if (error instanceof NotFoundError) {
			console.error("Session not found:", error);
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof SessionAlreadyApprovedError) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Internal server error" });
	}
}
