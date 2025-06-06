import { RejectSessionService } from '../sessions/rejectSessionService';
import { PrismaSessionsRepository } from '@/repositories/prisma/prismaSessionsRepository';
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository';


export function makeRejectSessionService() {
    const sessionsRepository = new PrismaSessionsRepository();
    const usersRepository = new PrismaUsersRepository();
    const subscribeUserToSessionService = new RejectSessionService(
        sessionsRepository,
        usersRepository
    );
    return subscribeUserToSessionService;
}