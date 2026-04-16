import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository";
import { CreatePostService } from "../posts/createPostService";

export function makeCreatePostService() {
	const postsRepository = new PrismaPostsRepository();
	return new CreatePostService(postsRepository);
}
