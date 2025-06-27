import { SessionsRepository } from "@/repositories/sessionsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { NotFoundError } from "@/services/errors/notFoundError";
import { SessionAlreadyApprovedError } from "@/services/errors/sessionAlreadyApprovedError";


interface approveSessionServiceRequest {
    sessionId: string;
    userId: string;
    approvedDate: string;
    location: string;
}

interface approveSessionServiceResponse {
    sessionId: string;
    userId: string;
    approvedDate: string;
    location: string;
}

export class ApproveSessionService {
    constructor(
        private sessionsRepository: SessionsRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        sessionId,
        userId,
        approvedDate,
        location
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

        if (!session.possibleDates.includes(approvedDate)) {
            throw new NotFoundError("Data aprovada não está entre as possíveis datas da sessão");
        }

        session.status = "aprovada";
        session.approvedDate = approvedDate;
        session.location = location;

        await this.sessionsRepository.update(session.id, {
            status: session.status,
            approvedDate: session.approvedDate,
            location: session.location,
        });

        return {
            sessionId: session.id,
            userId: user.id,
            approvedDate: session.approvedDate!,
            location: session.location
        };
    }
}