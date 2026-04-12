import { prisma } from "@/lib/prisma";
import type {
	CategoryRepository,
	CategoryWithCount,
} from "@/repositories/categoryRepository";
import type { Category, Prisma } from "@prisma/client";

export class PrismaCategoryRepository implements CategoryRepository {
	async create(data: Prisma.CategoryCreateInput): Promise<Category> {
		return prisma.category.create({ data });
	}

	async update(
		id: string,
		data: Prisma.CategoryUpdateInput,
	): Promise<Category> {
		return prisma.category.update({ where: { id }, data });
	}

	async delete(id: string): Promise<void> {
		await prisma.category.delete({ where: { id } });
	}

	async findById(id: string): Promise<Category | null> {
		return prisma.category.findUnique({ where: { id } });
	}

	async findBySlug(slug: string): Promise<Category | null> {
		return prisma.category.findUnique({ where: { slug } });
	}

	async findAll(): Promise<CategoryWithCount[]> {
		const rows = await prisma.category.findMany({
			include: {
				_count: {
					select: { posts: true },
				},
			},
			orderBy: { name: "asc" },
		});

		return rows.map((row) => ({
			...row,
			categoryCount: row._count.posts,
		}));
	}
}
