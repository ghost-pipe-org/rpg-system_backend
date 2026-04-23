import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { CancelEnrollmentService } from "../sessions/cancelEnrollmentService";

export function makeCancelEnrollmentService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const usersRepository = new PrismaUsersRepository();
	const service = new CancelEnrollmentService(
		sessionsRepository,
		usersRepository,
	);

	return service;
}
