import type { Session, SessionEnrollment, SessionPossibleDate } from "@prisma/client";
import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { UsersRepository } from "@/repositories/usersRepository";
import { AlreadyEnrolledError } from "../errors/alreadyEnrolledError";
import { InvalidSessionError } from "../errors/invalidSessionError";
import { InvalidUserError } from "../errors/invalidUserError";
import { SessionFullError } from "../errors/sessionFullError";

interface subscribeUserToSessionServiceRequest {
	sessionId: string;
	userId: string;
}

type SessionWithRelations = Session & {
	possibleDates: SessionPossibleDate[];
	enrollments: SessionEnrollment[];
	master?: {
		name: string;
	};
};

interface subscribeUserToSessionServiceResponse {
	session: SessionWithRelations | null;
}

export class SubscribeUserToSessionService {
	constructor(
		private sessionsRepository: SessionsRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute({
		sessionId,
		userId,
	}: subscribeUserToSessionServiceRequest): Promise<subscribeUserToSessionServiceResponse> {
		const session = await this.sessionsRepository.findById(sessionId);

		if (!session) {
			throw new InvalidSessionError();
		}

		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new InvalidUserError();
		}

		const alreadyEnrolled = await this.sessionsRepository.isUserEnrolled(
			sessionId,
			userId,
		);
		if (alreadyEnrolled) {
			throw new AlreadyEnrolledError();
		}

		const currentEnrollments = session.enrollments.length;
		if (currentEnrollments >= session.maxPlayers) {
			throw new SessionFullError();
		}

		const updatedSession = await this.sessionsRepository.subscribeUserToSession(sessionId, userId);

		return {
			session: updatedSession,
		};
	}
}
