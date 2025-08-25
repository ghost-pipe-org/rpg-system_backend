import type { UsersRepository } from "@/repositories/usersRepository";
import type { User } from "@prisma/client";
import { InvalidUserError } from "../errors/invalidUserError";

interface GetUserBasicProfileServiceRequest {
	userId: string;
}

type UserProfileData = Omit<User, "passwordHash">;

interface GetUserBasicProfileServiceResponse {
	user: UserProfileData;
}

export class GetUserBasicProfileService {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
	}: GetUserBasicProfileServiceRequest): Promise<GetUserBasicProfileServiceResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new InvalidUserError();
		}
		const { passwordHash, ...userProfileData } = user;
		return {
			user: userProfileData,
		};
	}
}
