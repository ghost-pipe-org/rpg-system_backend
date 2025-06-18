import { SessionsRepository } from "../../repositories/sessionsRepository";

interface GetCreatorEmittedSessionsServiceRequest {
  creatorId: string;
}

export class GetCreatorEmittedSessionsService {
  constructor(private sessionRepository: SessionsRepository) {}

  async execute({ creatorId }: GetCreatorEmittedSessionsServiceRequest) {
    const emittedSessions = await this.sessionRepository.findEmittedByCreator(creatorId);

    return {
      emittedSessions,
    };
  }
}