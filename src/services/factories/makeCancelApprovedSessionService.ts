import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { CancelApprovedSessionService } from "../sessions/cancelApprovedSessionService";

export function makeCancelApprovedSessionService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const usersRepository = new PrismaUsersRepository();
	const service = new CancelApprovedSessionService(
		sessionsRepository,
		usersRepository,
	);

	return service;
}
