import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { EmitWorkshopService } from "../sessions/emitWorkshopService";

export function makeEmitWorkshopService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const usersRepository = new PrismaUsersRepository();
	return new EmitWorkshopService(sessionsRepository, usersRepository);
}
