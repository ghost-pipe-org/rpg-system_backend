import type { AuthenticatedRequest } from "@/@types/express";
import { AlreadyEnrolledError } from "@/services/errors/alreadyEnrolledError";
import { InvalidSessionError } from "@/services/errors/invalidSessionError";
import { InvalidUserError } from "@/services/errors/invalidUserError";
import { SessionFullError } from "@/services/errors/sessionFullError";
import { makeSubscribeUserToSessionService } from "@/services/factories/makesubscribeUserToSessionService";
import type { Response } from "express";

export async function subscribeUserToSessionController(
	req: AuthenticatedRequest,
	res: Response,
) {
	const { sessionId } = req.params;
	const userId = req.user.id;

	try {
		const subscribeUserToSessionService = makeSubscribeUserToSessionService();

		await subscribeUserToSessionService.execute({
			sessionId,
			userId,
		});

		return res
			.status(200)
			.json({ message: "User subscribed to session successfully" });
	} catch (error) {
		if (error instanceof InvalidSessionError) {
			return res.status(404).json({ error: "Session not found" });
		}
		if (error instanceof InvalidUserError) {
			return res.status(404).json({ error: "User not found" });
		}
		if (error instanceof AlreadyEnrolledError) {
			return res
				.status(409)
				.json({ error: "User already subscribed to this session" });
		}
		if (error instanceof SessionFullError) {
			return res
				.status(409)
				.json({ error: "Session has reached maximum capacity" });
		}

		console.error("Error subscribing user to session:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
