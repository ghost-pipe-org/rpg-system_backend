import { describe, it, beforeEach, afterEach, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "@/app"; // sua instância do Express
import { prisma } from "@/lib/prisma"; // instância do Prisma


beforeAll(async () => {
  await prisma.user.deleteMany();
})

afterAll(async () => {
  await prisma.user.deleteMany();
})

describe("Register User E2E", () => {
	beforeEach(async () => {
		await prisma.user.deleteMany();
	});

	afterEach(async () => {
		await prisma.user.deleteMany();
	});

	it("deve registrar um novo usuário", async () => {
		const response = await request(app).post("/users").send({
			name: "Gabriel",
			email: "gabriel@email.com",
			password: "senha123aA",
			role: "admin",
		});

		expect(response.status).toBe(201);
		expect(response.body.message).toBe("User registered successfully");
	});

	it("não deve registrar usuário duplicado", async () => {
		await prisma.user.create({
			data: {
				name: "Gabriel",
				email: "gabriel@email.com",
				password_hash: "senha123aA",
				role: "admin",
			},
		});

		const response = await request(app).post("/users").send({
			name: "Gabriel",
			email: "gabriel@email.com",
			password: "senha123aA",
			role: "admin",
		});

		expect(response.status).toBe(409);
		expect(response.body.message).toMatch(/already exists/i);
	});
	it("não deve retornar a senha no corpo da resposta", async () => {
		const response = await request(app).post("/users").send({
			name: "SemSenha",
			email: "semsenha@email.com",
			password: "senha123aA",
			role: "admin",
		});

		expect(response.body).not.toHaveProperty("password");
		expect(response.body).not.toHaveProperty("password_hash");
	});
	it("deve retornar 400 se a role for inválida", async () => {
		const response = await request(app).post("/users").send({
			name: "Teste",
			email: "teste@email.com",
			password: "senha123aA",
			role: "papagaio",
		});

		expect(response.status).toBe(400);
		expect(response.body.message).toMatch(/admin/i);
    expect(response.body.message).toMatch(/user/i);
	});
	it("deve retornar 400 se a senha for fraca", async () => {
		const response = await request(app).post("/users").send({
			name: "Teste",
			email: "teste@email.com",
			password: "123",
			role: "admin",
		});

		expect(response.status).toBe(400);
		expect(response.body.message).toMatch(/password/i);
	});
	it("deve retornar 400 se o e-mail for inválido", async () => {
		const response = await request(app).post("/users").send({
			name: "Teste",
			email: "email-invalido",
			password: "senha123aA",
			role: "admin",
		});

		expect(response.status).toBe(400);
		expect(response.body.message).toMatch(/email/i);
	});
	it("deve retornar 400 se faltar campos obrigatórios", async () => {
		const response = await request(app).post("/users").send({
			email: "semnome@email.com",
			password: "senha123aA",
			role: "admin",
		});

		expect(response.status).toBe(400);
    console.log(response.body);
		expect(response.body.message).toMatch(/name/i);
	});
});
