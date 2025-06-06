import { SubscribeUserToSessionService } from '@/services/sessions/subscribeUserToSessionService';
import { PrismaSessionsRepository } from '@/repositories/prisma/prismaSessionsRepository';
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository';


export function makeSubscribeUserToSessionService() {
    const sessionsRepository = new PrismaSessionsRepository();
    const usersRepository = new PrismaUsersRepository();
    const subscribeUserToSessionService = new SubscribeUserToSessionService(
        sessionsRepository,
        usersRepository
    );
    return subscribeUserToSessionService;
}