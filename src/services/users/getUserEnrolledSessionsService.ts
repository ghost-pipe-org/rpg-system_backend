import { SessionsRepository } from "../../repositories/sessionsRepository";

interface GetUserEnrolledSessionsServiceRequest {
  userId: string;
}

export class GetUserEnrolledSessionsService {
  constructor(private sessionRepository: SessionsRepository) {}

  async execute({ userId }: GetUserEnrolledSessionsServiceRequest) {
    const enrolledSessions = await this.sessionRepository.findEnrolledByUser(userId);

    return {
      enrolledSessions,
    };
  }
}