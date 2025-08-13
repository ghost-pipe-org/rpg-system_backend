import type { User, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";
import type { UsersRepository } from "../../repositories/usersRepository";
import { MasterRequiresEnrollmentError } from "../errors/masterRequiresEnrollmentError";
import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";

interface RegisterServiceRequest {
	name: string;
	email: string;
	password: string;
	enrollment?: string;
	phoneNumber?: string;
	masterConfirm?: boolean;
}

interface RegisterServiceResponse {
	user: User;
}

export class RegisterService {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
		enrollment,
		phoneNumber,
		masterConfirm,
	}: RegisterServiceRequest): Promise<RegisterServiceResponse> {
		const passwordHash = await hash(password, 6);

		if (masterConfirm === true) {
			if (!enrollment || enrollment.trim() === "") {
				throw new MasterRequiresEnrollmentError();
			}
		}

		const userRole: UserRole = masterConfirm === true ? "MASTER" : "PLAYER";

		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.usersRepository.create({
			name,
			email,
			passwordHash,
			enrollment,
			phoneNumber,
			role: userRole,
		});
		return {
			user,
		};
	}
}
