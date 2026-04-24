import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { UsersRepository } from "@/repositories/usersRepository";
import { NotFoundError } from "@/services/errors/notFoundError";
import { SessionAlreadyApprovedError } from "@/services/errors/sessionAlreadyApprovedError";

interface approveSessionServiceRequest {
	sessionId: string;
	userId: string;
	approvedDate: Date;
	location: string;
}

interface approveSessionServiceResponse {
	sessionId: string;
	userId: string;
	approvedDate: Date;
	location: string;
}

export class ApproveSessionService {
	constructor(
		private sessionsRepository: SessionsRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute({
		sessionId,
		userId,
		approvedDate,
		location,
	}: approveSessionServiceRequest): Promise<approveSessionServiceResponse> {
		const session = await this.sessionsRepository.findById(sessionId);

		if (!session) {
			throw new NotFoundError("Sessão não encontrada");
		}

		if (session.status === "APROVADA") {
			throw new SessionAlreadyApprovedError();
		}

		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new NotFoundError("Usuário não encontrado");
		}

		const possibleDatesExists = session.possibleDates.some(
			(pd: { date: Date | string }) =>
				new Date(pd.date).toISOString().slice(0, 10) ===
				new Date(approvedDate).toISOString().slice(0, 10),
		);

		if (!possibleDatesExists) {
			throw new NotFoundError(
				"Data aprovada não está entre as possíveis datas da sessão",
			);
		}

		await this.sessionsRepository.update(session.id, {
			status: "APROVADA",
			approvedDate: approvedDate,
			location: location,
		});

		return {
			sessionId: session.id,
			userId: user.id,
			approvedDate: approvedDate,
			location: location,
		};
	}
}
