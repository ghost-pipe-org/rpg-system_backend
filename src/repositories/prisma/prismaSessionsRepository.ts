import { prisma } from "@/lib/prisma";
import type { Prisma, SessionStatus } from "@prisma/client";
import type { SessionsRepository } from "../sessionsRepository";

export class PrismaSessionsRepository implements SessionsRepository {
	async findById(id: string) {
		return prisma.session.findUnique({
			where: { id },
			include: {
				master: {
					select: {
						name: true,
					},
				},
				possibleDates: true,
				enrollments: true,
			},
		});
	}

	async create(data: Prisma.SessionCreateInput) {
		return prisma.session.create({
			data,
		});
	}

	async update(id: string, data: Prisma.SessionUpdateInput) {
		return prisma.session.update({
			where: { id },
			data,
		});
	}

	async delete(id: string) {
		await prisma.session.delete({
			where: { id },
		});
	}

	async getAll() {
		return prisma.session.findMany({
			include: {
				master: {
					select: {
						name: true,
					},
				},
				possibleDates: true,
			},
		});
	}

	async getByUserId(userId: string) {
		return prisma.session.findMany({
			where: {
				enrollments: {
					some: {
						userId: userId,
					},
				},
			},
			include: {
				master: {
					select: {
						name: true,
					},
				},
			},
		});
	}

	async getAllByStatus(status: string) {
		return prisma.session.findMany({
			where: { status: status as SessionStatus },
			include: {
				master: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				possibleDates: true,
			},
		});
	}

	async subscribeUserToSession(sessionId: string, userId: string) {
		return prisma.sessionEnrollment.create({
			data: {
				sessionId,
				userId,
				status: "PENDENTE",
			},
		});
	}

	async isUserEnrolled(sessionId: string, userId: string) {
		const enrollment = await prisma.sessionEnrollment.findFirst({
			where: {
				sessionId,
				userId,
			},
		});
		return !!enrollment;
	}

	async findFirstByMasterAndStatus(masterId: string, status: string) {
		return prisma.session.findFirst({
			where: {
				masterId,
				status: status as SessionStatus,
			},
		});
	}

	async findEmittedByMaster(masterId: string) {
		return prisma.session.findMany({
			where: {
				masterId,
			},
		});
	}

	async findEnrolledByUser(userId: string) {
		return prisma.sessionEnrollment.findMany({
			where: {
				userId,
			},
			include: {
				session: true, // Include session details if needed
			},
		});
	}
}
