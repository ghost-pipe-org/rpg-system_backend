import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { Session } from "@prisma/client";

interface GetAllSessionsServiceResponse {
	sessions: Session[];
}

export class GetAllSessionsService {
	constructor(private SessionRepository: SessionsRepository) {}

	async execute(): Promise<GetAllSessionsServiceResponse> {
		const sessions = await this.SessionRepository.getAll();

		return {
			sessions,
		};
	}
}
