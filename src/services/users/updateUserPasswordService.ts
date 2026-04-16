import type { UsersRepository } from "@/repositories/usersRepository";
import { InvalidUserError } from "../errors/invalidUserError";
import { InvalidCredentialsError } from "../errors/invalidCredentialsError";
import bcrypt from "bcryptjs";

interface UpdateUserPasswordServiceRequest {
	userId: string;
	currentPasswordRaw: string;
	newPasswordRaw: string;
}

export class UpdateUserPasswordService {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
		currentPasswordRaw,
		newPasswordRaw,
	}: UpdateUserPasswordServiceRequest): Promise<void> {
		const existingUser = await this.usersRepository.findById(userId);

		if (!existingUser) {
			throw new InvalidUserError();
		}

		const isPasswordValid = await bcrypt.compare(
			currentPasswordRaw,
			existingUser.passwordHash,
		);

		if (!isPasswordValid) {
			throw new InvalidCredentialsError();
		}

		const newPasswordHash = await bcrypt.hash(newPasswordRaw, 6);

		await this.usersRepository.update(userId, {
			passwordHash: newPasswordHash,
		});
	}
}
