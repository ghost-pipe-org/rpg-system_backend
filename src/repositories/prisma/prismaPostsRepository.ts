import { prisma } from "@/lib/prisma";
import type {
	PostWithRelations,
	PostsRepository,
} from "@/repositories/postsRepository";
import type { Post, Prisma } from "@prisma/client";

type PostRow = Prisma.PostGetPayload<{
	include: {
		author: true;
		categories: { include: { category: true } };
	};
}>;

export class PrismaPostsRepository implements PostsRepository {
	private mapToPostWithRelations(post: PostRow): PostWithRelations {
		return {
			...post,
			categories: post.categories.map((pc) => ({
				...pc,
				categoryName: pc.category.name,
			})),
		};
	}

	async create(data: Prisma.PostCreateInput) {
		return prisma.post.create({ data });
	}

	async update(id: string, data: Prisma.PostUpdateInput) {
		return prisma.post.update({ where: { id }, data });
	}

	async delete(id: string): Promise<void> {
		await prisma.post.delete({ where: { id } });
	}

	async findById(id: string): Promise<Post | null> {
		return prisma.post.findUnique({ where: { id } });
	}

	async findBySlug(slug: string): Promise<Post | null> {
		return prisma.post.findUnique({ where: { slug } });
	}

	async incrementViewCount(id: string): Promise<void> {
		await prisma.post.update({
			where: { id },
			data: { viewCount: { increment: 1 } },
		});
	}

	async findMany(
		args: Prisma.PostFindManyArgs,
	): Promise<{ posts: PostWithRelations[]; total: number }> {
		const { where, skip, take, orderBy, cursor, distinct } = args;

		const [rows, total] = await Promise.all([
			prisma.post.findMany({
				where,
				skip,
				take,
				orderBy,
				cursor,
				distinct,
				include: {
					author: true,
					categories: {
						include: {
							category: true,
						},
					},
				},
			}),
			prisma.post.count({ where }),
		]);

		return {
			posts: rows.map((p) => this.mapToPostWithRelations(p)),
			total,
		};
	}

	async slugExists(slug: string): Promise<boolean> {
		const found = await prisma.post.findUnique({
			where: { slug },
			select: { id: true },
		});
		return found !== null;
	}
}
