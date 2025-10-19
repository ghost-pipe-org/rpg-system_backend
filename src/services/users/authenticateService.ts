import type { UsersRepository } from "@/repositories/usersRepository";
import type { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalidCredentialsError";

interface AuthenticateRequest {
	email: string;
	password: string;
}

interface AuthenticateResponse {
	user: User;
}

export class AuthenticateService {
	constructor(private userRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateRequest): Promise<AuthenticateResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatch = await compare(password, user.passwordHash);

		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError();
		}

		return {
			user,
		};
	}
}
