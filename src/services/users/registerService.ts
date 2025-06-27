import type { User } from "@prisma/client";
import type { UsersRepository } from "../../repositories/usersRepository";
import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
    enrollment?: string;
    phoneNumber?: string;
    masterConfirm?: boolean; // Assuming this is not needed in the backend service
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name,
        email,
        password,
        enrollment,
        phoneNumber,
        masterConfirm, // This field is not used in the backend service

    }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const passwordHash = await hash(password, 6);
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash: passwordHash,
            enrollment,
            phoneNumber,
        });
        return {
            user
        };
    }

}