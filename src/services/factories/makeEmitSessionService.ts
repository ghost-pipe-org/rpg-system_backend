import { EmitSessionService } from '../sessions/emitSessionService';
import { PrismaSessionsRepository } from '@/repositories/prisma/prismaSessionsRepository';
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository';


export function makeEmitSessionService() {
    const sessionsRepository = new PrismaSessionsRepository();
    const subscribeUserToSessionService = new EmitSessionService(
        sessionsRepository,
    );
    return subscribeUserToSessionService;
}