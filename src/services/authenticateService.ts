import type { UsersRepository } from "@/repositories/usersRepository";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";
import { hash, compare } from "bcryptjs";
import type { User } from "@prisma/client";

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

		const doesPasswordMatch = await compare(password, user.password_hash);
		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError();
		}

		return {
			user,
		};
	}
}
