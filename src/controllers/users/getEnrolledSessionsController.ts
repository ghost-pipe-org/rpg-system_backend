import type { AuthenticatedRequest } from "@/@types/express";
import { makeGetUserEnrolledSessionsService } from "@/services/factories/makeGetUserEnrolledSessionsService";
import type { Response } from "express";

export async function getEnrolledSessionsController(
	req: AuthenticatedRequest,
	res: Response,
) {
	const getUserEnrolledSessionsService = makeGetUserEnrolledSessionsService();

	try {
		const userId = req.user.id;
		const { enrolledSessions } = await getUserEnrolledSessionsService.execute({
			userId,
		});

		return res.status(200).json({ enrolledSessions });
	} catch (error) {
		console.error("Error fetching enrolled sessions:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
