import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../../app";
import {
	cleanupTestData,
	createSession,
	createUser,
	enrollUserInSession,
} from "../helpers";

describe("Protected User Routes", () => {
	let playerToken: string;
	let masterToken: string;
	let playerId: string;
	let masterId: string;

	beforeEach(async () => {
		await cleanupTestData();

		const player = await createUser({
			email: "player@example.com",
			password: "Password123",
			role: "PLAYER",
		});

		const master = await createUser({
			email: "master@example.com",
			password: "Password123",
			role: "MASTER",
		});

		playerId = player.id;
		masterId = master.id;

		const playerAuth = await request(app).post("/users/authenticate").send({
			email: player.email,
			password: player.password,
		});

		const masterAuth = await request(app).post("/users/authenticate").send({
			email: master.email,
			password: master.password,
		});

		playerToken = playerAuth.body.token;
		masterToken = masterAuth.body.token;
	});

	describe("GET /my-emmitted-sessions", () => {
		it("should return emitted sessions for master user", async () => {
			await createSession({
				title: "Master Session 1",
				masterId: masterId,
				status: "APROVADA",
			});

			await createSession({
				title: "Master Session 2",
				masterId: masterId,
				status: "PENDENTE",
			});

			const response = await request(app)
				.get("/my-emmitted-sessions")
				.set("Authorization", `Bearer ${masterToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("emittedSessions");
			expect(response.body.emittedSessions).toHaveLength(2);
			expect(response.body.emittedSessions[0]).toHaveProperty("title");
			expect(response.body.emittedSessions[0]).toHaveProperty("status");
			expect(response.body.emittedSessions[0].masterId).toBe(masterId);
		});

		it("should return empty array for user with no emitted sessions", async () => {
			const response = await request(app)
				.get("/my-emmitted-sessions")
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("emittedSessions");
			expect(response.body.emittedSessions).toHaveLength(0);
		});

		it("should require authentication", async () => {
			await request(app).get("/my-emmitted-sessions").expect(401);
		});

		it("should reject invalid token", async () => {
			await request(app)
				.get("/my-emmitted-sessions")
				.set("Authorization", "Bearer invalid-token")
				.expect(401);
		});
	});

	describe("GET /my-enrolled-sessions", () => {
		it("should return enrolled sessions for user", async () => {
			const session = await createSession({
				title: "Test Session",
				masterId: masterId,
				status: "APROVADA",
			});

			await enrollUserInSession(playerId, session.id, "APROVADO");

			const response = await request(app)
				.get("/my-enrolled-sessions")
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("enrolledSessions");
			expect(response.body.enrolledSessions).toHaveLength(1);
			expect(response.body.enrolledSessions[0]).toHaveProperty("session");
			expect(response.body.enrolledSessions[0]).toHaveProperty("status");
			expect(response.body.enrolledSessions[0].session.title).toBe(
				"Test Session",
			);
			expect(response.body.enrolledSessions[0].status).toBe("APROVADO");
		});

		it("should return empty array for user with no enrollments", async () => {
			const response = await request(app)
				.get("/my-enrolled-sessions")
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("enrolledSessions");
			expect(response.body.enrolledSessions).toHaveLength(0);
		});

		it("should require authentication", async () => {
			await request(app).get("/my-enrolled-sessions").expect(401);
		});

		it("should filter enrollments by user", async () => {
			const anotherUser = await createUser({
				email: "another@example.com",
				password: "Password123",
			});

			const session = await createSession({
				title: "Test Session",
				masterId: masterId,
				status: "APROVADA",
			});

			await enrollUserInSession(playerId, session.id, "APROVADO");
			await enrollUserInSession(anotherUser.id, session.id, "APROVADO");

			const response = await request(app)
				.get("/my-enrolled-sessions")
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("enrolledSessions");
			expect(response.body.enrolledSessions).toHaveLength(1);
			expect(response.body.enrolledSessions[0].userId).toBe(playerId);
		});
	});
});
