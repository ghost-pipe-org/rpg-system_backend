import type { UsersRepository } from "@/repositories/usersRepository";
import type { Prisma, User } from "@prisma/client";
import { InvalidUserError } from "../errors/invalidUserError";

interface UpdateUserProfileServiceRequest {
	userId: string;
	name?: string;
	email?: string;
	phoneNumber?: string;
}

interface UpdateUserProfileServiceResponse {
	user: Omit<User, "passwordHash">;
}

export class UpdateUserProfileService {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
		name,
		email,
		phoneNumber,
	}: UpdateUserProfileServiceRequest): Promise<UpdateUserProfileServiceResponse> {
		const existingUser = await this.usersRepository.findById(userId);

		if (!existingUser) {
			throw new InvalidUserError();
		}
		const updateData: Prisma.UserUpdateInput = {};

		if (name !== undefined) {
			updateData.name = name.trim();
		}

		if (phoneNumber !== undefined) {
			updateData.phoneNumber = phoneNumber?.trim() || null;
		}
		if (email !== undefined) {
			updateData.email = email.trim();
		}

		const updatedUser = await this.usersRepository.update(userId, updateData);
		const { passwordHash, ...safeUserData } = updatedUser;

		return {
			user: safeUserData,
		};
	}
}
