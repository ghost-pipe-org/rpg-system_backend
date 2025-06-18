import { PrismaSessionsRepository } from "@/repositories/prisma/prismaSessionsRepository";
import { GetCreatorEmittedSessionsService } from "../users/getCreatorEmittedSessionsService";

export function makeGetCreatorEmittedSessionsService() {
    const sessionsRepository = new PrismaSessionsRepository();
    const service = new GetCreatorEmittedSessionsService(sessionsRepository);
    return service;
}