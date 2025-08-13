import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { GetAvaliableSessionsService } from "../sessions/getAvaliableSessionsService";

export function makeAvaliableSessionsService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const avaliableSessionsService = new GetAvaliableSessionsService(
		sessionsRepository,
	);
	return avaliableSessionsService;
}
