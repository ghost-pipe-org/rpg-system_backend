import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { ApproveSessionService } from "../sessions/approveSessionService";

export function makeApproveSessionService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const usersRepository = new PrismaUsersRepository();
	const subscribeUserToSessionService = new ApproveSessionService(
		sessionsRepository,
		usersRepository,
	);
	return subscribeUserToSessionService;
}
