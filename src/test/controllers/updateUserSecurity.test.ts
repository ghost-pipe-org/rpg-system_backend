import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../../app";
import type { TestUser } from "../helpers";
import { cleanupTestData, createUser } from "../helpers";

describe("Update User Security Controllers", () => {
	let playerToken: string;
	let playerId: string;
	let playerData: TestUser;

	beforeEach(async () => {
		await cleanupTestData();

		playerData = await createUser({
			name: "Security Test Player",
			email: "security@example.com",
			password: "OldPassword123!",
			role: "PLAYER",
		});

		playerId = playerData.id;

		const playerAuth = await request(app).post("/users/authenticate").send({
			email: playerData.email,
			password: playerData.password,
		});

		playerToken = playerAuth.body.token;
	});

	describe("PATCH /users/password", () => {
		it("should update user password successfully", async () => {
			const response = await request(app)
				.patch("/users/password")
				.set("Authorization", `Bearer ${playerToken}`)
				.send({
					currentPassword: "OldPassword123!",
					newPassword: "NewPassword456@",
				})
				.expect(200);

			expect(response.body).toHaveProperty("message", "Senha atualizada com sucesso");

			// Test login with new password
			const newAuth = await request(app).post("/users/authenticate").send({
				email: playerData.email,
				password: "NewPassword456@",
			});
			expect(newAuth.status).toBe(200);
		});

		it("should reject with wrong current password", async () => {
			const response = await request(app)
				.patch("/users/password")
				.set("Authorization", `Bearer ${playerToken}`)
				.send({
					currentPassword: "WrongPassword!",
					newPassword: "NewPassword456@",
				})
				.expect(400);

			expect(response.body).toHaveProperty("message", "Credenciais inválidas: a senha atual está incorreta");
		});

		it("should reject password that is too weak", async () => {
			const response = await request(app)
				.patch("/users/password")
				.set("Authorization", `Bearer ${playerToken}`)
				.send({
					currentPassword: "OldPassword123!",
					newPassword: "weak", // Fails Zod validation
				})
				.expect(400);

			expect(response.body).toHaveProperty("errors");
		});

		it("should require authentication", async () => {
			await request(app)
				.patch("/users/password")
				.send({
					currentPassword: "OldPassword123!",
					newPassword: "NewPassword456@",
				})
				.expect(401);
		});
	});

	describe("PATCH /users/email", () => {
		it("should update user email successfully", async () => {
			const response = await request(app)
				.patch("/users/email")
				.set("Authorization", `Bearer ${playerToken}`)
				.send({
					currentPassword: "OldPassword123!",
					newEmail: "new.security@example.com",
				})
				.expect(200);

			expect(response.body).toHaveProperty("message", "Email atualizado com sucesso");
			expect(response.body).toHaveProperty("data");
			expect(response.body.data.email).toBe("new.security@example.com");

			// Test login with new email
			const newAuth = await request(app).post("/users/authenticate").send({
				email: "new.security@example.com",
				password: "OldPassword123!",
			});
			expect(newAuth.status).toBe(200);
		});

		it("should reject with wrong current password", async () => {
			const response = await request(app)
				.patch("/users/email")
				.set("Authorization", `Bearer ${playerToken}`)
				.send({
					currentPassword: "WrongPassword!",
					newEmail: "new.security@example.com",
				})
				.expect(400);

			expect(response.body).toHaveProperty("message", "Credenciais inválidas: a senha atual está incorreta");
		});

		it("should reject updating to an email already in use", async () => {
			// Create another user
			await createUser({
				name: "Other User",
				email: "other@example.com",
				password: "Password123!",
				role: "PLAYER",
			});

			const response = await request(app)
				.patch("/users/email")
				.set("Authorization", `Bearer ${playerToken}`)
				.send({
					currentPassword: "OldPassword123!",
					newEmail: "other@example.com", // Belongs to other user
				})
				.expect(409);

			expect(response.body).toHaveProperty("message", "O endereço de email fornecido já está em uso");
		});

		it("should require authentication", async () => {
			await request(app)
				.patch("/users/email")
				.send({
					currentPassword: "OldPassword123!",
					newEmail: "new.security@example.com",
				})
				.expect(401);
		});
	});
});
