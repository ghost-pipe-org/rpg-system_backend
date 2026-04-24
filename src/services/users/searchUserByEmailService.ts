import type { UsersRepository } from "@/repositories/usersRepository";
import { NotFoundError } from "../errors/notFoundError";

interface SearchUserByEmailServiceRequest {
	email: string;
}

interface SearchUserByEmailServiceResponse {
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
	};
}

export class SearchUserByEmailService {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
	}: SearchUserByEmailServiceRequest): Promise<SearchUserByEmailServiceResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new NotFoundError("Usuário não encontrado");
		}

		return {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}
}
