// src/services/sessions/cancelApprovedSessionService.ts
import { SessionStatus } from "@prisma/client";
import { SessionsRepository } from "../../repositories/sessionsRepository";
import { CancelDeadlineExceededError } from "../errors/cancelDeadlineExceededError";
import { CancelJustificationRequiredError } from "../errors/cancelJustificationRequiredError";
import { NotSessionMasterError } from "../errors/notSessionMasterError";
import { NotApprovedSessionError } from "../errors/notApprovedSessionError";

interface CancelApprovedSessionRequest {
	sessionId: string;
	masterId: string;
	cancelEvent: string;
}

export class CancelApprovedSessionService {
	async execute({ sessionId, masterId, cancelEvent }: CancelApprovedSessionRequest) {
		// Validação da justificativa
		if (!cancelEvent || cancelEvent.trim().length === 0) {
			throw new CancelJustificationRequiredError();
		}

		// Buscar a sessão
		const session = await SessionsRepository.findById(sessionId);
		
		if (!session) {
			throw new Error("Sessão não encontrada");
		}

		// Validação de ownership
		if (session.masterId !== masterId) {
			throw new NotSessionMasterError();
		}

		// Validação de status
		if (session.status !== SessionStatus.APPROVED) {
			throw new NotApprovedSessionError();
		}

		// Validação de prazo (72 horas antes da approvedDate)
		if (session.approvedDate) {
			const now = new Date();
			const sessionDate = new Date(session.approvedDate);
			const timeDiff = sessionDate.getTime() - now.getTime();
			const hoursDiff = timeDiff / (1000 * 3600);

			if (hoursDiff <= 72) {
				throw new CancelDeadlineExceededError();
			}
		}

		// Atualizar a sessão
		const updatedSession = await SessionsRepository.update(sessionId, {
			status: SessionStatus.CANCELED,
			cancelEvent: cancelEvent.trim()
		});

		return updatedSession;
	}
}