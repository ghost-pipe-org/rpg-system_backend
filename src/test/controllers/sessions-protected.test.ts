import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../../app";
import {
	cleanupTestData,
	createSession,
	createSessionWithDates,
	createUser,
	enrollUserInSession,
} from "../helpers";

describe("Protected Sessions Routes", () => {
	let playerToken: string;
	let masterToken: string;
	let adminToken: string;
	let playerId: string;
	let masterId: string;
	let adminId: string;

	beforeEach(async () => {
		await cleanupTestData();

		const player = await createUser({
			email: "player@example.com",
			password: "password123",
			role: "PLAYER",
		});

		const master = await createUser({
			email: "master@example.com",
			password: "password123",
			role: "MASTER",
		});

		const admin = await createUser({
			email: "admin@example.com",
			password: "password123",
			role: "ADMIN",
		});

		playerId = player.id;
		masterId = master.id;
		adminId = admin.id;

		const playerAuth = await request(app)
			.post("/users/authenticate")
			.send({ email: player.email, password: player.password });

		const masterAuth = await request(app)
			.post("/users/authenticate")
			.send({ email: master.email, password: master.password });

		const adminAuth = await request(app)
			.post("/users/authenticate")
			.send({ email: admin.email, password: admin.password });

		playerToken = playerAuth.body.token;
		masterToken = masterAuth.body.token;
		adminToken = adminAuth.body.token;
	});

	describe("GET /sessions (Admin only)", () => {
		it("should return all sessions for admin", async () => {
			await createSession({
				title: "Session 1",
				masterId: masterId,
				status: "APROVADA",
			});

			await createSession({
				title: "Session 2",
				masterId: masterId,
				status: "PENDENTE",
			});

			const response = await request(app)
				.get("/sessions")
				.set("Authorization", `Bearer ${adminToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("sessions");
			expect(response.body.sessions).toHaveLength(2);
		});

		it("should require admin role", async () => {
			await request(app)
				.get("/sessions")
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(403);

			await request(app)
				.get("/sessions")
				.set("Authorization", `Bearer ${masterToken}`)
				.expect(403);
		});

		it("should require authentication", async () => {
			await request(app).get("/sessions").expect(401);
		});
	});

	describe("POST /sessions/:sessionId/subscribe", () => {
		let sessionId: string;

		beforeEach(async () => {
			const session = await createSession({
				title: "Test Session",
				masterId: masterId,
				status: "APROVADA",
			});
			sessionId = session.id;
		});

		it("should allow player to subscribe to session", async () => {
			const response = await request(app)
				.post(`/sessions/${sessionId}/subscribe`)
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("session");
			expect(response.body.session).toHaveProperty("enrollments");
			expect(Array.isArray(response.body.session.enrollments)).toBe(true);
		});

		it("should allow master to subscribe to session", async () => {
			const anotherMaster = await createUser({
				email: "master2@example.com",
				password: "password123",
				role: "MASTER",
			});

			const masterAuth = await request(app)
				.post("/users/authenticate")
				.send({ email: anotherMaster.email, password: anotherMaster.password });

			await request(app)
				.post(`/sessions/${sessionId}/subscribe`)
				.set("Authorization", `Bearer ${masterAuth.body.token}`)
				.expect(200);
		});

		it("should not allow admin to subscribe", async () => {
			await request(app)
				.post(`/sessions/${sessionId}/subscribe`)
				.set("Authorization", `Bearer ${adminToken}`)
				.expect(403);
		});

		it("should not allow subscription to non-existent session", async () => {
			const fakeId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

			await request(app)
				.post(`/sessions/${fakeId}/subscribe`)
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(404);
		});

		it("should require authentication", async () => {
			await request(app).post(`/sessions/${sessionId}/subscribe`).expect(401);
		});

		it("should not allow duplicate subscription", async () => {
			await request(app)
				.post(`/sessions/${sessionId}/subscribe`)
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(200);

			await request(app)
				.post(`/sessions/${sessionId}/subscribe`)
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(409);
		});
	});

	describe("POST /sessions (Create session)", () => {
		const sessionData = {
			title: "New RPG Session",
			description: "An exciting D&D adventure",
			system: "D&D 5e",
			minPlayers: 3,
			maxPlayers: 5,
			requirements: "Basic knowledge of D&D",
			period: "NOITE",
			possibleDates: ["2025-12-01T19:00:00Z", "2025-12-02T19:00:00Z"],
		};

		it("should allow master to emmit session", async () => {
			const response = await request(app)
				.post("/sessions")
				.set("Authorization", `Bearer ${masterToken}`)
				.send(sessionData)
				.expect(201);

			expect(response.body).toHaveProperty("session");
			expect(response.body.session).toHaveProperty("id");
			expect(response.body.session.title).toBe(sessionData.title);
			expect(response.body.session.status).toBe("PENDENTE");
			expect(response.body.session.masterId).toBe(masterId);
		});

		it("should not allow player to create session", async () => {
			await request(app)
				.post("/sessions")
				.set("Authorization", `Bearer ${playerToken}`)
				.send(sessionData)
				.expect(403);
		});

		it("should not allow admin to create session", async () => {
			await request(app)
				.post("/sessions")
				.set("Authorization", `Bearer ${adminToken}`)
				.send(sessionData)
				.expect(403);
		});

		it("should validate required fields", async () => {
			const invalidData = {
				title: "Test Session",
			};

			await request(app)
				.post("/sessions")
				.set("Authorization", `Bearer ${masterToken}`)
				.send(invalidData)
				.expect(400);
		});

		it("should require authentication", async () => {
			await request(app).post("/sessions").send(sessionData).expect(401);
		});
	});
});
