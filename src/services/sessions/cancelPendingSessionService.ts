import { SessionsRepository } from "@/repositories/sessionsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { NotFoundError } from "../errors/notFoundError";
import { SessionNotPending } from "../errors/SessionNotPending";
import { error } from "node:console";
import { userIsNotMaster } from "../errors/userIsNotMaster"
import { cancelPendingSessionController } from "@/controllers/sessions/cancelPendingSessionController";


// DTO
interface cancelSessionServiceRequest {
	sessionId: string;
	userId: string;
}

interface cancelSessionServiceResponse {
    message: String;
}

export class CancelPendingSessionService{
    constructor(
        private sessionsRepository: SessionsRepository,
        private usersRepository: UsersRepository,
    ) {}
    
    async execute({userId, sessionId}: cancelSessionServiceRequest): Promise<cancelSessionServiceRequest>{
        const user = await this.usersRepository.findById(userId);
        const session = await this.sessionsRepository.findById(sessionId);

        if (!session) {
			throw new NotFoundError("Sessão não encontrada");
		}

        if(session.status !== "PENDENTE"){
            throw new SessionNotPending();
        }

        if (!user) {
			throw new NotFoundError("Usuário não encontrado");
		}

        if (session.masterId !== userId){
            throw new userIsNotMaster();
        }

        await this.sessionsRepository.update(session.id, {
			status: "CANCELADA",
		});

        return {
            message: `Infelizmente, sua solicitação não pôde ser atendida, pois as datas escolhidas não são adequadas para a mestragem da mesa. Por favor contate o admin do sistema.`
        }
        
        
    }
}