import type { SessionsRepository } from "../../repositories/sessionsRepository";

export interface GetMasterEmittedSessionsServiceRequest {
	masterId: string;
}

export class GetMasterEmittedSessionsService {
	constructor(private sessionRepository: SessionsRepository) {}

	async execute({ masterId }: GetMasterEmittedSessionsServiceRequest) {
		const emittedSessions =
			await this.sessionRepository.findEmittedByMaster(masterId);

		return {
			emittedSessions,
		};
	}
}
