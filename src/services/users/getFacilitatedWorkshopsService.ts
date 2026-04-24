import type { SessionsRepository } from "../../repositories/sessionsRepository";

interface GetFacilitatedWorkshopsServiceRequest {
	userId: string;
}

export class GetFacilitatedWorkshopsService {
	constructor(private sessionRepository: SessionsRepository) {}

	async execute({ userId }: GetFacilitatedWorkshopsServiceRequest) {
		const workshops =
			await this.sessionRepository.findEmittedByFacilitator(userId);

		return {
			workshops,
		};
	}
}
