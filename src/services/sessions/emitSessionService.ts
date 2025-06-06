import { Session } from "@prisma/client";
import { SessionsRepository } from "@/repositories/sessionsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { PendingSessionExistsError } from "../errors/PendingSessionExistsError";


interface emitSessionServiceRequest {
    title: string;
    description: string;
    requirements?: string;
    system: string;
    location: string;
    possibleDates: string;
    period: string;
    minPlayers: number;
    maxPlayers: number;
    creatorId: string;
}

interface emitSessionServiceResponse {
    session: Session;
}

export class EmitSessionService {
    constructor(
        private sessionsRepository: SessionsRepository,
    ) { }

    async execute({
        title,
        description,
        requirements,
        system,
        location,
        possibleDates,
        period,
        minPlayers,
        maxPlayers,
        creatorId
    }: emitSessionServiceRequest): Promise<emitSessionServiceResponse> {

        const pendingSession = await this.sessionsRepository.findFirstByCreatorAndStatus(creatorId, "pendente");
        if (pendingSession) {
            throw new PendingSessionExistsError();
        }

        const session = await this.sessionsRepository.create({
            title,
            description,
            requirements,
            system,
            location,
            possibleDates,
            period,
            minPlayers,
            maxPlayers,
            status: "pendente",
            currentPlayers: 0,
            creator: { connect: { id: creatorId } }
        });

        return {
            session
        };
    }
}

