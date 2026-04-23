import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { UsersRepository } from "@/repositories/usersRepository";
import { NotFoundError } from "../errors/notFoundError";
import { SessionCancellationWindowError } from "../errors/sessionCancellationWindowError";
import { userIsNotMaster } from "../errors/userIsNotMaster";

interface CancelApprovedSessionServiceRequest {
	sessionId: string;
	masterId: string;
	cancelEvent: string;
}

interface CancelApprovedSessionServiceResponse {
	message: string;
}

export class CancelApprovedSessionService {
	constructor(
		private sessionsRepository: SessionsRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute({
		sessionId,
		masterId,
		cancelEvent,
	}: CancelApprovedSessionServiceRequest): Promise<CancelApprovedSessionServiceResponse> {
		const session = await this.sessionsRepository.findById(sessionId);

		if (!session) {
			throw new NotFoundError("Sessão não encontrada");
		}

		if (!session.approvedDate) {
			throw new NotFoundError("Sessão não possui data aprovada");
		}

		const user = await this.usersRepository.findById(masterId);

		if (!user) {
			throw new NotFoundError("Usuário não encontrado");
		}

		if (session.masterId !== masterId) {
			throw new userIsNotMaster();
		}

		const now = new Date();
		const sessionDate = new Date(session.approvedDate);
		const diffMs = sessionDate.getTime() - now.getTime();
		const diffHours = diffMs / (1000 * 60 * 60);

		if (diffHours < 48) {
			throw new SessionCancellationWindowError();
		}

		await this.sessionsRepository.update(session.id, {
			status: "CANCELADA",
			cancelEvent,
		});

		return {
			message: "Sessão cancelada com sucesso.",
		};
	}
}
