import type { SessionsRepository } from "@/repositories/sessionsRepository";
import type { UsersRepository } from "@/repositories/usersRepository";
import { SessionNotPending } from "../errors/SessionNotPending";
import { NotFoundError } from "../errors/notFoundError";
import { userIsNotMaster } from "../errors/userIsNotMaster";

// DTO
interface cancelSessionServiceRequest {
	sessionId: string;
	userId: string;
}

interface cancelSessionServiceResponse {
	message: string;
}

export class CancelPendingSessionService {
	constructor(
		private sessionsRepository: SessionsRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute({
		userId,
		sessionId,
	}: cancelSessionServiceRequest): Promise<cancelSessionServiceResponse> {
		const user = await this.usersRepository.findById(userId);
		const session = await this.sessionsRepository.findById(sessionId);

		if (!session) {
			throw new NotFoundError("Sessão não encontrada");
		}

		if (session.status !== "PENDENTE") {
			throw new SessionNotPending();
		}

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

		await this.sessionsRepository.update(session.id, {
			status: "CANCELADA",
		});

		return {
			message: "Solicitação cancelada com sucesso.",
		};
	}
}
