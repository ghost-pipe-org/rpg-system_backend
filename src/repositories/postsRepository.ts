import type {
	Category,
	Post,
	PostCategory,
	PostStatus,
	Prisma,
	User,
} from "@prisma/client";

export type PostWithRelations = Post & {
	author: User;
	categories: (PostCategory & { category: Category; categoryName: string })[];
};

export type PostFilters = {
	status?: PostStatus;
	categorySlug?: string;
	search?: string;
	page?: number;
	limit?: number;
};

export interface PostsRepository {
	create(data: Prisma.PostCreateInput): Promise<Post>;
	update(id: string, data: Prisma.PostUpdateInput): Promise<Post>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<Post | null>;
	findBySlug(slug: string): Promise<Post | null>;
	incrementViewCount(id: string): Promise<void>;
	findMany(
		filters: Prisma.PostFindManyArgs,
	): Promise<{ posts: PostWithRelations[]; total: number }>;
	slugExists(slug: string): Promise<boolean>;
}
