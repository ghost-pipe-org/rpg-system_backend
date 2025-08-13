import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { Session, SessionPeriod } from "@prisma/client";
import { PendingSessionExistsError } from "../errors/PendingSessionExistsError";

interface emitSessionServiceRequest {
	title: string;
	description: string;
	requirements?: string;
	system: string;
	possibleDates: Date[];
	period: SessionPeriod;
	minPlayers: number;
	maxPlayers: number;
	masterId: string;
	location: string;
}

interface emitSessionServiceResponse {
	session: Session;
}

export class EmitSessionService {
	constructor(private sessionsRepository: SessionsRepository) {}

	async execute({
		title,
		description,
		requirements,
		system,
		possibleDates,
		period,
		minPlayers,
		maxPlayers,
		masterId,
		location,
	}: emitSessionServiceRequest): Promise<emitSessionServiceResponse> {
		const pendingSession =
			await this.sessionsRepository.findFirstByMasterAndStatus(
				masterId,
				"PENDENTE",
			);
		if (pendingSession) {
			throw new PendingSessionExistsError();
		}

		const session = await this.sessionsRepository.create({
			title,
			description,
			requirements,
			system,
			location,
			period,
			minPlayers,
			maxPlayers,
			status: "PENDENTE",
			master: { connect: { id: masterId } },
			possibleDates: {
				create: possibleDates.map((date) => ({
					date,
				})),
			},
		});

		return {
			session,
		};
	}
}
