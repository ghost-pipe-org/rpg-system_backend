import { SessionsRepository } from "@/repositories/sessionsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { NotFoundError } from "@/services/errors/notFoundError";
import { SessionAlreadyApprovedError } from "@/services/errors/sessionAlreadyApprovedError";


interface approveSessionServiceRequest {
    sessionId: string;
    userId: string;

}

interface approveSessionServiceResponse {
    sessionId: string;
    userId: string;
}

export class ApproveSessionService {
    constructor(
        private sessionsRepository: SessionsRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        sessionId,
        userId
    }: approveSessionServiceRequest): Promise<approveSessionServiceResponse> {

        const session = await this.sessionsRepository.findById(sessionId);

        if (!session) {
            throw new NotFoundError("Sessão não encontrada");
        }

        if (session.status === "aprovada") {
            throw new SessionAlreadyApprovedError();
        }

        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }

        session.status = "aprovada";

        await this.sessionsRepository.update(session.id, {
            status: session.status,
        });

        return {
            sessionId: session.id,
            userId: user.id
        };
    }
}