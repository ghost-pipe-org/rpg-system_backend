import type { Post, PostStatus } from "@prisma/client";

import type { PostsRepository } from "@/repositories/postsRepository";
import { SlugAlreadyExistsError } from "../errors/SlugAlreadyExistsError";

interface CreatePostServiceRequest {
	title: string;
	slug: string;
	content: string;
	authorId: string;
	summary?: string | null;
	coverImageUrl?: string | null;
	status?: PostStatus;
	categoryIds?: string[];
}

interface CreatePostServiceResponse {
	post: Post;
}

export class CreatePostService {
	constructor(private postsRepository: PostsRepository) {}

	async execute({
		title,
		slug,
		content,
		authorId,
		summary = null,
		coverImageUrl = null,
		status,
		categoryIds,
	}: CreatePostServiceRequest): Promise<CreatePostServiceResponse> {
		const slugInUse = await this.postsRepository.slugExists(slug);

		if (slugInUse) {
			throw new SlugAlreadyExistsError();
		}

		const post = await this.postsRepository.create({
			title,
			slug,
			summary,
			content,
			coverImageUrl,
			status,
			author: { connect: { id: authorId } },
			categories: categoryIds?.length
				? {
						create: categoryIds.map((categoryId) => ({
							category: { connect: { id: categoryId } },
						})),
					}
				: undefined,
		});

		return { post };
	}
}

