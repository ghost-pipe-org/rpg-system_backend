import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { SearchUserByEmailService } from "../users/searchUserByEmailService";

export function makeSearchUserByEmailService() {
	const usersRepository = new PrismaUsersRepository();
	return new SearchUserByEmailService(usersRepository);
}
