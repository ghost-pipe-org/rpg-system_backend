import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { EventType, Session } from "@prisma/client";

interface GetAvaliableSessionsServiceResponse {
	sessions: Session[];
}

export class GetAvaliableSessionsService {
	constructor(private sessionRepository: SessionsRepository) {}

	async execute(type: EventType): Promise<GetAvaliableSessionsServiceResponse> {
		const sessions = await this.sessionRepository.getAllByStatusAndType(
			"APROVADA",
			type,
		);

		return {
			sessions,
		};
	}
}
