import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../../app";
import { cleanupTestData, createUser } from "../helpers";

describe("Users Authentication", () => {
	beforeEach(async () => {
		await cleanupTestData();
	});

	describe("POST /users", () => {
		it("should register a new user successfully", async () => {
			const userData = {
				name: "John Doe",
				email: "john@example.com",
				password: "Password123",
				masterConfirm: false,
			};

			const response = await request(app)
				.post("/users")
				.send(userData)
				.expect(201);

			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("User registered successfully");
		});

		it("should not register user with duplicate email", async () => {
			const userData = {
				name: "John Doe",
				email: "john@example.com",
				password: "Password123",
				masterConfirm: false,
			};

			await request(app).post("/users").send(userData).expect(201);

			const response = await request(app)
				.post("/users")
				.send(userData)
				.expect(409);

			expect(response.body).toHaveProperty("message");
		});

		it("should not register user with invalid email", async () => {
			const userData = {
				name: "John Doe",
				email: "invalid-email",
				password: "Password123",
				masterConfirm: false,
			};

			const response = await request(app)
				.post("/users")
				.send(userData)
				.expect(400);

			expect(response.body).toHaveProperty("errors");
		});

		it("should not register user with missing required fields", async () => {
			const userData = {
				email: "john@example.com",
			};

			const response = await request(app)
				.post("/users")
				.send(userData)
				.expect(400);

			expect(response.body).toHaveProperty("errors");
		});

		it("should register master user successfully", async () => {
			const userData = {
				name: "Master John",
				email: "master@example.com",
				password: "Password123",
				masterConfirm: true,
				enrollment: "123456789",
				phoneNumber: "+5511999999999",
			};

			const response = await request(app)
				.post("/users")
				.send(userData)
				.expect(201);

			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("User registered successfully");
		});
	});

	describe("POST /users/authenticate", () => {
		it("should authenticate user with valid credentials", async () => {
			const user = await createUser({
				email: "john@example.com",
				password: "Password123",
			});

			const response = await request(app)
				.post("/users/authenticate")
				.send({
					email: user.email,
					password: user.password,
				})
				.expect(200);

			expect(response.body).toHaveProperty("token");
			expect(response.body).toHaveProperty("user");
			expect(response.body.user.email).toBe(user.email);
			expect(response.body.user).not.toHaveProperty("passwordHash");
		});

		it("should not authenticate user with invalid email", async () => {
			const response = await request(app)
				.post("/users/authenticate")
				.send({
					email: "nonexistent@example.com",
					password: "password123",
				})
				.expect(400);

			expect(response.body).toHaveProperty("message");
		});

		it("should not authenticate user with invalid password", async () => {
			const user = await createUser({
				email: "john@example.com",
				password: "Password123",
			});

			const response = await request(app)
				.post("/users/authenticate")
				.send({
					email: user.email,
					password: "wrongpassword",
				})
				.expect(400);

			expect(response.body).toHaveProperty("message");
		});

		it("should not authenticate with missing credentials", async () => {
			const response = await request(app)
				.post("/users/authenticate")
				.send({
					email: "john@example.com",
				})
				.expect(400);

			expect(response.body).toHaveProperty("errors");
		});
	});
});
