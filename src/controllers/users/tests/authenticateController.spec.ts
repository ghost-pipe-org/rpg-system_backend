import request from "supertest";
import app from "@/app";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Role } from "@prisma/client";


beforeAll(async () => {
  await prisma.user.deleteMany();
})

afterAll(async () => {
  await prisma.user.deleteMany();
})

describe("Authenticate User E2E", () => {

  const userData = {
    name: "Gabriel",
    email: "gabriel@email.com",
    password: "senha123aA",
    role: "admin" as Role,
  };

  beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password_hash: await bcrypt.hash(userData.password, 8),
        role: userData.role,
      },
    });
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("deve autenticar com sucesso e retornar token", async () => {
    const response = await request(app).post("/users/authenticate").send({
      email: userData.email,
      password: userData.password,
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User authenticated successfully");
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  it("deve falhar com senha incorreta", async () => {
    const response = await request(app).post("/users/authenticate").send({
      email: userData.email,
      password: "senhaErrada",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/invalid credentials/i);
  });

  it("deve falhar com e-mail inexistente", async () => {
    const response = await request(app).post("/users/authenticate").send({
      email: "naoexiste@email.com",
      password: "qualquerSenha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/invalid credentials/i);
  });

  it("deve retornar 400 se faltar campos obrigatórios", async () => {
    const response = await request(app).post("/users/authenticate").send({
      email: userData.email,
      // password ausente
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password/i);
  });
});