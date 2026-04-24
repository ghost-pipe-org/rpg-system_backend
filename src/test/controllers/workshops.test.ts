import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../../app";
import {
	cleanupTestData,
	createSession,
	createUser,
	createWorkshop,
} from "../helpers";

describe("Workshop Routes", () => {
	let masterToken: string;
	let playerToken: string;
	let adminToken: string;
	let masterId: string;
	let playerId: string;

	beforeEach(async () => {
		await cleanupTestData();

		const master = await createUser({
			email: "master@example.com",
			password: "password123",
			role: "MASTER",
		});

		const player = await createUser({
			email: "player@example.com",
			password: "password123",
			role: "PLAYER",
		});

		const admin = await createUser({
			email: "admin@example.com",
			password: "password123",
			role: "ADMIN",
		});

		masterId = master.id;
		playerId = player.id;

		const masterAuth = await request(app)
			.post("/users/authenticate")
			.send({ email: master.email, password: master.password });

		const playerAuth = await request(app)
			.post("/users/authenticate")
			.send({ email: player.email, password: player.password });

		const adminAuth = await request(app)
			.post("/users/authenticate")
			.send({ email: admin.email, password: admin.password });

		masterToken = masterAuth.body.token;
		playerToken = playerAuth.body.token;
		adminToken = adminAuth.body.token;
	});

	describe("POST /workshops", () => {
		const workshopData = {
			title: "Introdução ao RPG",
			description: "Ementa da oficina sobre os fundamentos do RPG",
			requirements: "Nenhum",
			location: "Sala 101",
			possibleDates: ["2025-12-01T19:00:00Z", "2025-12-02T19:00:00Z"],
			period: "NOITE",
			minPlayers: 5,
			maxPlayers: 20,
		};

		it("should allow a master to emit a workshop with themselves as facilitator", async () => {
			const response = await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.send({ ...workshopData, facilitatorIds: [masterId] })
				.expect(201);

			expect(response.body).toHaveProperty("data");
			expect(response.body.data.title).toBe(workshopData.title);
			expect(response.body.data.type).toBe("OFICINA");
			expect(response.body.data.system).toBeNull();
		});

		it("should allow multiple facilitators", async () => {
			const secondMaster = await createUser({
				email: "master2@example.com",
				password: "password123",
				role: "MASTER",
			});

			const response = await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.send({ ...workshopData, facilitatorIds: [masterId, secondMaster.id] })
				.expect(201);

			expect(response.body.data).toHaveProperty("id");
		});

		it("should not allow a master with a pending workshop to emit another", async () => {
			await createWorkshop({ facilitatorIds: [masterId] });

			await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.send({ ...workshopData, facilitatorIds: [masterId] })
				.expect(409);
		});

		it("should allow a master with a pending session (MESA) to emit a workshop (OFICINA)", async () => {
			await createSession({
				title: "Pending Mesa",
				masterId,
				status: "PENDENTE",
			});

			await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.send({ ...workshopData, facilitatorIds: [masterId] })
				.expect(201);
		});

		it("should not allow a player to emit a workshop", async () => {
			await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${playerToken}`)
				.send({ ...workshopData, facilitatorIds: [playerId] })
				.expect(403);
		});

		it("should not allow an admin to emit a workshop", async () => {
			await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ ...workshopData, facilitatorIds: [masterId] })
				.expect(403);
		});

		it("should require authentication", async () => {
			await request(app)
				.post("/workshops")
				.send({ ...workshopData, facilitatorIds: [masterId] })
				.expect(401);
		});

		it("should return 400 when required fields are missing", async () => {
			await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.send({ title: "Só o título" })
				.expect(400);
		});

		it("should allow emission even when facilitatorIds is empty (creator is added automatically)", async () => {
			const response = await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.send({ ...workshopData, facilitatorIds: [] })
				.expect(201);

			expect(response.body).toHaveProperty("data");
		});

		it("should return 404 when a facilitatorId does not exist", async () => {
			await request(app)
				.post("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.send({
					...workshopData,
					facilitatorIds: ["a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"],
				})
				.expect(404);
		});
	});

	describe("GET /workshops/approved", () => {
		it("should return only approved workshops", async () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 10);

			await createWorkshop({
				title: "Oficina Aprovada",
				status: "APROVADA",
				approvedDate: futureDate,
				facilitatorIds: [masterId],
			});

			await createWorkshop({
				title: "Oficina Pendente",
				status: "PENDENTE",
				facilitatorIds: [masterId],
			});

			const response = await request(app)
				.get("/workshops/approved")
				.expect(200);

			expect(response.body.data).toHaveLength(1);
			expect(response.body.data[0].title).toBe("Oficina Aprovada");
		});

		it("should not return approved sessions (MESA) in the workshop list", async () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 10);

			await createSession({
				title: "Mesa Aprovada",
				masterId,
				status: "APROVADA",
				approvedDate: futureDate,
			});

			const response = await request(app)
				.get("/workshops/approved")
				.expect(200);

			expect(response.body.data).toHaveLength(0);
		});

		it("should not require authentication", async () => {
			await request(app).get("/workshops/approved").expect(200);
		});
	});

	describe("GET /workshops (admin)", () => {
		it("should return all workshops for admin", async () => {
			await createWorkshop({ status: "PENDENTE", facilitatorIds: [masterId] });
			await createWorkshop({ status: "APROVADA", facilitatorIds: [masterId] });

			const response = await request(app)
				.get("/workshops")
				.set("Authorization", `Bearer ${adminToken}`)
				.expect(200);

			expect(response.body.data.length).toBeGreaterThanOrEqual(2);
			expect(
				response.body.data.every((w: { type: string }) => w.type === "OFICINA"),
			).toBe(true);
		});

		it("should not allow master to access the full workshop list", async () => {
			await request(app)
				.get("/workshops")
				.set("Authorization", `Bearer ${masterToken}`)
				.expect(403);
		});

		it("should require authentication", async () => {
			await request(app).get("/workshops").expect(401);
		});
	});

	describe("POST /workshops/:sessionId/subscribe — schedule conflict (cross-type)", () => {
		it("should not allow a user to enroll in a workshop conflicting with a session in the same period", async () => {
			const sessionDate = new Date();
			sessionDate.setDate(sessionDate.getDate() + 7);

			const mesa = await createSession({
				title: "Mesa na mesma data",
				masterId,
				status: "APROVADA",
				approvedDate: sessionDate,
				period: "TARDE",
			});

			const oficina = await createWorkshop({
				title: "Oficina no mesmo período",
				status: "APROVADA",
				approvedDate: sessionDate,
				period: "TARDE",
				facilitatorIds: [masterId],
			});

			await request(app)
				.post(`/sessions/${mesa.id}/subscribe`)
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(200);

			await request(app)
				.post(`/workshops/${oficina.id}/subscribe`)
				.set("Authorization", `Bearer ${playerToken}`)
				.expect(409);
		});
	});
});
