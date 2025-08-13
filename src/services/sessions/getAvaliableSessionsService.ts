import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { Session } from "@prisma/client";

interface GetAvaliableSessionsServiceResponse {
	sessions: Session[];
}

export class GetAvaliableSessionsService {
	constructor(private SessionRepository: SessionsRepository) {}

	async execute(): Promise<GetAvaliableSessionsServiceResponse> {
		const sessions = await this.SessionRepository.getAllByStatus("APROVADA");

		return {
			sessions,
		};
	}
}
