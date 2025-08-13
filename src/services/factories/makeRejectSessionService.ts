import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { RejectSessionService } from "../sessions/rejectSessionService";

export function makeRejectSessionService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const usersRepository = new PrismaUsersRepository();
	const subscribeUserToSessionService = new RejectSessionService(
		sessionsRepository,
		usersRepository,
	);
	return subscribeUserToSessionService;
}
