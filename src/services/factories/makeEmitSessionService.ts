import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { EmitSessionService } from "../sessions/emitSessionService";

export function makeEmitSessionService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const subscribeUserToSessionService = new EmitSessionService(
		sessionsRepository,
	);
	return subscribeUserToSessionService;
}
