import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../../app";
import {
	cleanupTestData,
	createSession,
	createSessionWithDates,
	createUser,
} from "../helpers";

describe("Public Sessions Routes", () => {
	let masterId: string;

	beforeEach(async () => {
		await cleanupTestData();

		const master = await createUser({
			email: "master@example.com",
			password: "Password123",
			role: "MASTER",
		});

		masterId = master.id;
	});

	describe("GET /sessions/approved", () => {
		it("should return only approved sessions", async () => {
			await createSession({
				title: "Approved Session 1",
				masterId: masterId,
				status: "APROVADA",
			});

			await createSession({
				title: "Approved Session 2",
				masterId: masterId,
				status: "APROVADA",
			});

			await createSession({
				title: "Pending Session",
				masterId: masterId,
				status: "PENDENTE",
			});

			await createSession({
				title: "Rejected Session",
				masterId: masterId,
				status: "REJEITADA",
			});

			const response = await request(app).get("/sessions/approved").expect(200);

			expect(response.body).toHaveProperty("sessions");
			expect(response.body.sessions).toHaveLength(2);
			for (const session of response.body.sessions) {
				expect(session.status).toBe("APROVADA");
				expect(["Approved Session 1", "Approved Session 2"]).toContain(
					session.title,
				);
			}
		});

		it("should return empty array when no approved sessions exist", async () => {
			await createSession({
				title: "Pending Session",
				masterId: masterId,
				status: "PENDENTE",
			});

			const response = await request(app).get("/sessions/approved").expect(200);

			expect(response.body).toHaveProperty("sessions");
			expect(response.body.sessions).toHaveLength(0);
		});

		it("should return sessions with all required fields", async () => {
			await createSession({
				title: "Complete Session",
				description: "Test description",
				system: "D&D 5e",
				location: "Online",
				minPlayers: 3,
				maxPlayers: 6,
				requirements: "No experience needed",
				masterId: masterId,
				status: "APROVADA",
				period: "NOITE",
			});

			const response = await request(app).get("/sessions/approved").expect(200);

			expect(response.body).toHaveProperty("sessions");
			expect(response.body.sessions).toHaveLength(1);

			const session = response.body.sessions[0];
			expect(session).toHaveProperty("id");
			expect(session).toHaveProperty("title", "Complete Session");
			expect(session).toHaveProperty("description", "Test description");
			expect(session).toHaveProperty("system", "D&D 5e");
			expect(session).toHaveProperty("location", "Online");
			expect(session).toHaveProperty("minPlayers", 3);
			expect(session).toHaveProperty("maxPlayers", 6);
			expect(session).toHaveProperty("requirements", "No experience needed");
			expect(session).toHaveProperty("status", "APROVADA");
			expect(session).toHaveProperty("period", "NOITE");
			expect(session).toHaveProperty("createdAt");
			expect(session).toHaveProperty("updatedAt");
		});

		it("should include creator information", async () => {
			await createSession({
				title: "Session with Creator",
				masterId: masterId,
				status: "APROVADA",
			});

			const response = await request(app).get("/sessions/approved").expect(200);

			expect(response.body).toHaveProperty("sessions");
			expect(response.body.sessions).toHaveLength(1);

			const session = response.body.sessions[0];
			expect(session).toHaveProperty("master");
			expect(session.master).toHaveProperty("id", masterId);
			expect(session.master).toHaveProperty("name");
			expect(session.master).toHaveProperty("email");
			expect(session.master).not.toHaveProperty("passwordHash");
		});

		it("should include possible dates if they exist", async () => {
			const dates = [
				new Date("2025-12-01T19:00:00Z"),
				new Date("2025-12-02T19:00:00Z"),
				new Date("2025-12-03T19:00:00Z"),
			];

			await createSessionWithDates(
				{
					title: "Session with Dates",
					masterId: masterId,
					status: "APROVADA",
				},
				dates,
			);

			const response = await request(app).get("/sessions/approved").expect(200);

			expect(response.body).toHaveProperty("sessions");
			expect(response.body.sessions).toHaveLength(1);

			const session = response.body.sessions[0];
			expect(session).toHaveProperty("possibleDates");
			expect(session.possibleDates).toHaveLength(3);
			expect(session.possibleDates[0]).toHaveProperty("date");
		});

		it("should not require authentication", async () => {
			await createSession({
				title: "Public Session",
				masterId: masterId,
				status: "APROVADA",
			});

			const response = await request(app).get("/sessions/approved").expect(200);

			expect(response.body).toHaveProperty("sessions");
			expect(response.body.sessions).toHaveLength(1);
		});
	});
});
