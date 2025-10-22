import type {
	Prisma,
	Session,
	SessionEnrollment,
	SessionPossibleDate,
} from "@prisma/client";

type SessionWithRelations = Session & {
	possibleDates: SessionPossibleDate[];
	enrollments: SessionEnrollment[];
	master?: {
		name: string;
	};
};

export interface SessionsRepository {
	findById(id: string): Promise<SessionWithRelations | null>;
	create(data: Prisma.SessionCreateInput): Promise<Session>;
	update(id: string, data: Prisma.SessionUpdateInput): Promise<Session>;
	delete(id: string): Promise<void>;
	getAll(): Promise<Session[]>;
	getByUserId(userId: string): Promise<Session[]>;
	getAllByStatus(status: string): Promise<Session[]>;
	subscribeUserToSession(
		sessionId: string,
		userId: string,
	): Promise<SessionEnrollment>;
	isUserEnrolled(sessionId: string, userId: string): Promise<boolean>;
	findFirstByMasterAndStatus(
		masterId: string,
		status: string,
	): Promise<Session | null>;
	findEmittedByMaster(masterId: string): Promise<Session[]>;
	findEnrolledByUser(userId: string): Promise<SessionEnrollment[]>;
}
