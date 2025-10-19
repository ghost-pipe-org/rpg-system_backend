import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { SubscribeUserToSessionService } from "@/services/sessions/subscribeUserToSessionService";

export function makeSubscribeUserToSessionService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const usersRepository = new PrismaUsersRepository();
	const subscribeUserToSessionService = new SubscribeUserToSessionService(
		sessionsRepository,
		usersRepository,
	);
	return subscribeUserToSessionService;
}
