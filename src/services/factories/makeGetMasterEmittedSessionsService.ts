import { PrismaSessionsRepository } from "../../repositories/prisma/prismaSessionsRepository";
import { GetMasterEmittedSessionsService } from "../users/getMasterEmittedSessionsService";

export function makeGetMasterEmittedSessionsService() {
	const sessionsRepository = new PrismaSessionsRepository();
	const service = new GetMasterEmittedSessionsService(sessionsRepository);

	return service;
}
