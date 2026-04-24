import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { UsersRepository } from "@/repositories/usersRepository";
import type { Session, SessionPeriod } from "@prisma/client";
import { InvalidUserError } from "../errors/invalidUserError";
import { PendingWorkshopExistsError } from "../errors/pendingWorkshopExistsError";

interface EmitWorkshopServiceRequest {
	title: string;
	description: string;
	requirements?: string;
	location?: string;
	possibleDates: Date[];
	period: SessionPeriod;
	minPlayers: number;
	maxPlayers: number;
	facilitatorIds: string[];
}

interface EmitWorkshopServiceResponse {
	session: Session;
}

export class EmitWorkshopService {
	constructor(
		private sessionsRepository: SessionsRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute({
		title,
		description,
		requirements,
		location,
		possibleDates,
		period,
		minPlayers,
		maxPlayers,
		facilitatorIds,
	}: EmitWorkshopServiceRequest): Promise<EmitWorkshopServiceResponse> {
		for (const facilitatorId of facilitatorIds) {
			const user = await this.usersRepository.findById(facilitatorId);
			if (!user) {
				throw new InvalidUserError();
			}

			const pendingWorkshop =
				await this.sessionsRepository.findFirstByFacilitatorAndStatusAndType(
					facilitatorId,
					"PENDENTE",
					"OFICINA",
				);
			if (pendingWorkshop) {
				throw new PendingWorkshopExistsError();
			}
		}

		const session = await this.sessionsRepository.create({
			type: "OFICINA",
			title,
			description,
			requirements,
			location,
			period,
			minPlayers,
			maxPlayers,
			status: "PENDENTE",
			possibleDates: {
				create: possibleDates.map((date) => ({
					date,
				})),
			},
		});

		for (const facilitatorId of facilitatorIds) {
			await this.sessionsRepository.addFacilitator(session.id, facilitatorId);
		}

		return {
			session,
		};
	}
}
