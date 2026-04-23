import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { UpdateUserPasswordService } from "../users/updateUserPasswordService";

export function makeUpdateUserPasswordService() {
	const usersRepository = new PrismaUsersRepository();
	const updateUserPasswordService = new UpdateUserPasswordService(
		usersRepository,
	);

	return updateUserPasswordService;
}
