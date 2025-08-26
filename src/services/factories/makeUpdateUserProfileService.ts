import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { UpdateUserProfileService } from "../users/updateUserProfileService";

export function makeUpdateUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserProfileService = new UpdateUserProfileService(usersRepository);
  return updateUserProfileService;
}