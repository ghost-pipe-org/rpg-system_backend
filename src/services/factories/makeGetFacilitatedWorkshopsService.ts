import { PrismaSessionsRepository } from "../../repositories/prisma/prismaSessionsRepository";
import { GetFacilitatedWorkshopsService } from "../users/getFacilitatedWorkshopsService";

export function makeGetFacilitatedWorkshopsService() {
	const sessionsRepository = new PrismaSessionsRepository();
	return new GetFacilitatedWorkshopsService(sessionsRepository);
}
