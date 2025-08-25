import type { SessionsRepository, SessionEnrollmentWithSession } from "@/repositories/sessionsRepository";
import type { Session } from "@prisma/client";

interface GetUserActivityHistoryServiceRequest {
	userId: string;
	limit?: number;
	offset?: number;
}

interface GetUserActivityHistoryServiceResponse {
	emmitedSessions: Session[];
	enrolledSessions: SessionEnrollmentWithSession[];
	totalEmmited: number;
	totalEnrolled: number;
}

export class GetUserActivityHistoryService {
	constructor(private sessionsRepository: SessionsRepository) {}

	async execute({
		userId,
		limit = 50,
		offset = 0,
	}: GetUserActivityHistoryServiceRequest): Promise<GetUserActivityHistoryServiceResponse> {
		const [emmitedSessions, enrolledSessions] = await Promise.all([
			this.sessionsRepository.findEmittedByMaster(userId),
			this.sessionsRepository.findEnrolledByUser(userId),
		]);
		const paginatedEmitted = emmitedSessions.slice(offset, offset + limit);
		const paginatedEnrolled = enrolledSessions.slice(offset, offset + limit);

		return {
			emmitedSessions: paginatedEmitted,
			enrolledSessions: paginatedEnrolled,
			totalEmmited: emmitedSessions.length,
			totalEnrolled: enrolledSessions.length,
		};
	}
}
