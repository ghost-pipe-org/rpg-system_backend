import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../app";

describe("API Health Check", () => {
	it("should return API status", async () => {
		const response = await request(app).get("/").expect(200);

		expect(response.text).toBe("API Node.js");
	});
});
