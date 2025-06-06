import type { Prisma } from '@prisma/client';
import type { UsersRepository } from '../usersRepository'; // Adjust the import path as necessary
import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
    })
        return user;
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })
        return user;
    }
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
        })
        return user;
    }
}