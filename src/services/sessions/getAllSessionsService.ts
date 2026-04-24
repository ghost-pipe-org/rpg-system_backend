import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { EventType, Session } from "@prisma/client";

interface GetAllSessionsServiceResponse {
	sessions: Session[];
}

export class GetAllSessionsService {
	constructor(private sessionRepository: SessionsRepository) {}

	async execute(type: EventType): Promise<GetAllSessionsServiceResponse> {
		const sessions = await this.sessionRepository.getAllByType(type);

		return {
			sessions,
		};
	}
}
