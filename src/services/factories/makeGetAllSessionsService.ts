import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { GetAllSessionsService } from "../sessions/getAllSessionsService";

export function makeGetAllSessionsService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const avaliableSessionsService = new GetAllSessionsService(
		sessionsRepository,
	);
	return avaliableSessionsService;
}
