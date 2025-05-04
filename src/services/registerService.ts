import type { Role, User } from "@prisma/client";
import type { UsersRepository } from "../repositories/usersRepository";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
    role: Role;

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
        role
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
            role
        });
        return {
            user
        };
    }

}