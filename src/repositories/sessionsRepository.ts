import type { Prisma, Session, SessionEnrollment } from "@prisma/client";

export interface SessionsRepository {
    findById(id: string): Promise<Session | null>;
    create(data: Prisma.SessionCreateInput): Promise<Session>;
    update(id: string, data: Prisma.SessionUpdateInput): Promise<Session>;
    delete(id: string): Promise<void>;
    getAll(): Promise<Session[]>;
    getByUserId(userId: string): Promise<Session[]>;
    getAllByStatus(status: string): Promise<Session[]>;
    subscribeUserToSession(sessionId: string, userId: string): Promise<SessionEnrollment>;
    isUserEnrolled(sessionId: string, userId: string): Promise<boolean>;
    findFirstByCreatorAndStatus( 
        creatorId: string,
        status: string
    ): Promise<Session | null>;
    findEmittedByCreator(creatorId: string): Promise<Session[]>;
    findEnrolledByUser(userId: string): Promise<SessionEnrollment[]>;
}