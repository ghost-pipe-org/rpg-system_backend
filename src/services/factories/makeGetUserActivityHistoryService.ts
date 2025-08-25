import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { GetUserActivityHistoryService } from "../users/getUserActivityHistoryService";

export function makeGetUserActivityHistoryService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const getUserActivityHistoryService = new GetUserActivityHistoryService(sessionsRepository);

	return getUserActivityHistoryService;
}
