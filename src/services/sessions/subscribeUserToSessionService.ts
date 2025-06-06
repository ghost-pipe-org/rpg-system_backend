import { SessionsRepository } from "@/repositories/sessionsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { InvalidSessionError } from "../errors/invalidSessionError";
import { InvalidUserError } from "../errors/invalidUserError";
import { AlreadyEnrolledError } from "../errors/alreadyEnrolledError";

interface subscribeUserToSessionServiceRequest {
    sessionId: string;
    userId: string;
}

interface subscribeUserToSessionServiceResponse {
    success: boolean;
    message: string;
}

export class SubscribeUserToSessionService {
    constructor(
        private sessionsRepository: SessionsRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        sessionId,
        userId,
    }: subscribeUserToSessionServiceRequest): Promise<subscribeUserToSessionServiceResponse> {
        const session = await this.sessionsRepository.findById(sessionId);

        if (!session) {
            throw new InvalidSessionError();
        }

        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new InvalidUserError();
        }

        const alreadyEnrolled = await this.sessionsRepository.isUserEnrolled(sessionId, userId);
        if (alreadyEnrolled) {
            throw new AlreadyEnrolledError();
        }

        await this.sessionsRepository.subscribeUserToSession(sessionId, userId);
        await this.sessionsRepository.update(sessionId, {
            currentPlayers: {
                increment: 1,
            },
        });

        return {
            success: true,
            message: "User successfully subscribed to the session.",
        };
    }
}

