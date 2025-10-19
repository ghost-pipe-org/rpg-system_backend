import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { GetUserEnrolledSessionsService } from "../users/getUserEnrolledSessionsService";

export function makeGetUserEnrolledSessionsService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const service = new GetUserEnrolledSessionsService(sessionsRepository);
	return service;
}
