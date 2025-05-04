import type { User, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { UsersRepository } from "../usersRepository"; // Adjust the import path as necessary

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findByEmail(email: string) {
        const user = this.items.find((user) => user.email === email);
        return user || null;
    }

    async create(data: Prisma.UserCreateInput){
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            role: data.role ?? "user",
            createdAt: new Date(),
        }
        this.items.push(user);
        return user;
    }

}
