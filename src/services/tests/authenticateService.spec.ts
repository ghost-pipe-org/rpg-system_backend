import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateService } from "../authenticateService";
import { InMemoryUsersRepository } from "../../repositories/in-memory/inMemoryUsersRepository";
import { InvalidCredentialsError } from "../errors/invalidCredentialsError";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateService(usersRepository);

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 8),
            role: "user",
        });
    });

    it("should authenticate with valid credentials", async () => {
        const { user } = await sut.execute({
            email: "johndoe@example.com",
            password: "123456",
        });

        expect(user).toHaveProperty("id");
        expect(user.email).toBe("johndoe@example.com");
    });

    it("should not authenticate with invalid email", async () => {
        await expect(
            sut.execute({
                email: "invalid@example.com",
                password: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not authenticate with invalid password", async () => {
        await expect(
            sut.execute({
                email: "johndoe@example.com",
                password: "wrongpassword",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});