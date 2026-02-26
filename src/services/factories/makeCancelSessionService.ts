import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { CancelPendingSessionService } from "../sessions/cancelSessionService";

export function makeCancelSessionService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const usersRepository = new PrismaUsersRepository();
	const cancelPendingSessionService = new CancelPendingSessionService(
		sessionsRepository,
		usersRepository,
	);

	return cancelPendingSessionService;
}
