import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterService } from "../registerService";
import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";
import { hash, compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../../repositories/in-memory/inMemoryUsersRepository";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService; // System Under Test

describe("Register Service", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterService(usersRepository);
	});
	it("should be able to register in user role", async () => {
		const { user } = await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
			role: "user",
		});
		expect(user.id).toEqual(expect.any(String));
		expect(user.role).toEqual("user");
	});
	it("should be able to register in admin role", async () => {
		const { user } = await sut.execute({
			name: "Admin User",
			email: "admin@example.com",
			password: "admin123",
			role: "admin",
		});
		expect(user.id).toEqual(expect.any(String));
		expect(user.role).toEqual("admin");
	});
	it("should hash the password before saving the user", async () => {
		const { user } = await sut.execute({
			name: "Jane Doe",
			email: "janedoe@example.com",
			password: "123456",
			role: "user",
		});

		const isPasswordCorrectlyHashed = await compare(
			"123456",
			user.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});
    it("should not allow registering with an existing email", async () => {
        await sut.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
            role: "user",
        });

        await expect(
            sut.execute({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "123456",
                role: "user",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
