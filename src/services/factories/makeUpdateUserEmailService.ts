import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { UpdateUserEmailService } from "../users/updateUserEmailService";

export function makeUpdateUserEmailService() {
	const usersRepository = new PrismaUsersRepository();
	const updateUserEmailService = new UpdateUserEmailService(usersRepository);

	return updateUserEmailService;
}
