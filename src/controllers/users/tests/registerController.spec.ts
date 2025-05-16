import { describe, it, beforeEach, afterEach, expect } from "vitest";
import request from "supertest";
import app from "@/app"; // sua instância do Express
import { prisma } from "@/lib/prisma"; // instância do Prisma

describe("Register User E2E", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("deve registrar um novo usuário", async () => {
    const response = await request(app)
      .post("/users")
      .send({
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

    const response = await request(app)
      .post("/users")
      .send({
        name: "Gabriel",
        email: "gabriel@email.com",
        password: "senha123aA",
        role: "admin",
      });

    console.log(response.body);
    expect(response.status).toBe(409);
    expect(response.body.message).toMatch(/already exists/i);
  });
});