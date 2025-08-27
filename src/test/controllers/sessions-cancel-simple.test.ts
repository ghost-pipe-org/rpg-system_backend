import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../../app";
import { cleanupTestData, createSession, createUser } from "../helpers";

describe("Cancel Session Routes - Simple Test", () => {
	let masterToken: string;
	let masterId: string;

	beforeEach(async () => {
		await cleanupTestData();

		const master = await createUser({
			email: "master@example.com",
			password: "password123",
			role: "MASTER",
		});

		masterId = master.id;

		const masterAuth = await request(app)
			.post("/users/authenticate")
			.send({ email: master.email, password: master.password });

		masterToken = masterAuth.body.token;
	});

	describe("DELETE /sessions/:sessionId", () => {
		it("should require authentication", async () => {
			const fakeId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

			await request(app)
				.delete(`/sessions/${fakeId}`)
				.expect(401);
		});

		it("should not cancel non-existent session", async () => {
			const fakeId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

			await request(app)
				.delete(`/sessions/${fakeId}`)
				.set("Authorization", `Bearer ${masterToken}`)
				.expect(404);
		});

		it("should allow master to cancel their pending session", async () => {
			const pendingSession = await createSession({
				title: "Pending Session",
				masterId: masterId,
				status: "PENDENTE",
			});

			const response = await request(app)
				.delete(`/sessions/${pendingSession.id}`)
				.set("Authorization", `Bearer ${masterToken}`)
				.expect(200);

			expect(response.body).toHaveProperty("message");
		});
	});
});
