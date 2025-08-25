import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { GetUserBasicProfileService } from "../users/getUserBasicProfileService";

export function makeGetUserBasicProfileService() {
	const usersRepository = new PrismaUsersRepository();
	const getUserBasicProfileService = new GetUserBasicProfileService(usersRepository);

	return getUserBasicProfileService;
}
