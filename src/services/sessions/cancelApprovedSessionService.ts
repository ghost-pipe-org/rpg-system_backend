import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { UsersRepository } from "@/repositories/usersRepository";
import { InvalidSessionError } from "../errors/invalidSessionError";
import { NotFoundError } from "../errors/notFoundError";
import { SessionCancellationWindowError } from "../errors/sessionCancellationWindowError";
import { userIsNotMaster } from "../errors/userIsNotMaster";

interface CancelApprovedSessionServiceRequest {
	sessionId: string;
	userId: string;
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
		userId,
		cancelEvent,
	}: CancelApprovedSessionServiceRequest): Promise<CancelApprovedSessionServiceResponse> {
		const session = await this.sessionsRepository.findById(sessionId);

		if (!session) {
			throw new NotFoundError("Sessão não encontrada");
		}

		if (!session.approvedDate) {
			throw new InvalidSessionError();
		}

		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new NotFoundError("Usuário não encontrado");
		}

		if (session.type === "MESA") {
			if (session.masterId !== userId) {
				throw new userIsNotMaster();
			}
		} else {
			const isFacilitator = session.facilitators.some(
				(f) => f.userId === userId,
			);
			if (!isFacilitator) {
				throw new userIsNotMaster();
			}
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
