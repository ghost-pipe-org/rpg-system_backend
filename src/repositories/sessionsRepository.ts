import type { Prisma, Session } from "@prisma/client";

export interface SessionsRepository {
    findById(id: string): Promise<Session | null>;
    create(data: Prisma.SessionCreateInput): Promise<Session>;
    update(id: string, data: Prisma.SessionUpdateInput): Promise<Session>;
    delete(id: string): Promise<void>;
    getAll(): Promise<Session[]>;
    getByUserId(userId: string): Promise<Session[]>;
    getAllByStatus(status: string): Promise<Session[]>;
}