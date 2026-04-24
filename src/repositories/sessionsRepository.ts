import type {
	EventType,
	Prisma,
	Session,
	SessionEnrollment,
	SessionFacilitator,
	SessionPossibleDate,
} from "@prisma/client";

type FacilitatorWithUser = SessionFacilitator & {
	user: {
		id: string;
		name: string;
		email: string;
	};
};

type SessionWithRelations = Session & {
	possibleDates: SessionPossibleDate[];
	enrollments: SessionEnrollment[];
	facilitators: FacilitatorWithUser[];
	master?: {
		name: string;
	} | null;
};

export type SessionEnrollmentWithSession = SessionEnrollment & {
	session: Session;
};

export type { SessionWithRelations, FacilitatorWithUser };

export interface SessionsRepository {
	findById(id: string): Promise<SessionWithRelations | null>;
	create(data: Prisma.SessionCreateInput): Promise<Session>;
	update(id: string, data: Prisma.SessionUpdateInput): Promise<Session>;
	delete(id: string): Promise<void>;
	getAll(): Promise<Session[]>;
	getAllByType(type: EventType): Promise<Session[]>;
	getByUserId(userId: string): Promise<Session[]>;
	getAllByStatus(status: string): Promise<Session[]>;
	getAllByStatusAndType(status: string, type: EventType): Promise<Session[]>;
	subscribeUserToSession(
		sessionId: string,
		userId: string,
	): Promise<SessionEnrollment>;
	unsubscribeUserFromSession(sessionId: string, userId: string): Promise<void>;
	isUserEnrolled(sessionId: string, userId: string): Promise<boolean>;
	findFirstByMasterAndStatusAndType(
		masterId: string,
		status: string,
		type: EventType,
	): Promise<Session | null>;
	findFirstByFacilitatorAndStatusAndType(
		userId: string,
		status: string,
		type: EventType,
	): Promise<Session | null>;
	findEmittedByMaster(masterId: string): Promise<Session[]>;
	findEmittedByFacilitator(userId: string): Promise<Session[]>;
	findEnrolledByUser(userId: string): Promise<SessionEnrollmentWithSession[]>;
	addFacilitator(sessionId: string, userId: string): Promise<void>;
}
