import { randomUUID } from "node:crypto";
import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../usersRepository";

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	async findByEmail(email: string) {
		const user = this.items.find((user) => user.email === email);
		return user || null;
	}

	async findById(id: string) {
		const user = this.items.find((user) => user.id === id);
		return user || null;
	}

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			role: data.role ?? "PLAYER",
			enrollment: data.enrollment ?? null,
			phoneNumber: data.phoneNumber ?? null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.items.push(user);
		return user;
	}
}
