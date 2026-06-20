import { PostNotFoundError } from "@/services/errors/postNotFoundError";
import { makeGetPostBySlugService } from "@/services/factories/makeGetPostBySlugService";
import { makeListPostsService } from "@/services/factories/makeListPostsService";
import { beforeEach, describe, expect, it } from "vitest";
import {
	cleanupTestData,
	createCategory,
	createPost,
	createUser,
	prisma,
} from "../helpers";

describe("Posts integration", () => {
	let authorId: string;

	beforeEach(async () => {
		await cleanupTestData();

		const author = await createUser({
			email: "author@example.com",
			password: "password123",
			role: "ADMIN",
		});

		authorId = author.id;
	});

	describe("ListPostsService", () => {
		it("should list only published posts for public visitors", async () => {
			await createPost({
				authorId,
				title: "Published Post",
				slug: "published-post",
				status: "PUBLICADO",
			});

			await createPost({
				authorId,
				title: "Draft Post",
				slug: "draft-post",
				status: "RASCUNHO",
			});

			await createPost({
				authorId,
				title: "Archived Post",
				slug: "archived-post",
				status: "ARQUIVADO",
			});

			const listPostsService = makeListPostsService();
			const result = await listPostsService.execute({});

			expect(result.total).toBe(1);
			expect(result.posts).toHaveLength(1);
			expect(result.posts[0].title).toBe("Published Post");
			expect(result.posts[0].status).toBe("PUBLICADO");
		});

		it("should allow admins to filter posts by status", async () => {
			await createPost({
				authorId,
				title: "Published Post",
				slug: "published-post",
				status: "PUBLICADO",
			});

			await createPost({
				authorId,
				title: "Draft Post",
				slug: "draft-post",
				status: "RASCUNHO",
			});

			const listPostsService = makeListPostsService();
			const result = await listPostsService.execute({
				status: "RASCUNHO",
				isAdmin: true,
			});

			expect(result.total).toBe(1);
			expect(result.posts[0].title).toBe("Draft Post");
			expect(result.posts[0].status).toBe("RASCUNHO");
		});

		it("should paginate results", async () => {
			for (let index = 1; index <= 12; index++) {
				await createPost({
					authorId,
					title: `Post ${index}`,
					slug: `post-${index}`,
					status: "PUBLICADO",
				});
			}

			const listPostsService = makeListPostsService();
			const result = await listPostsService.execute({
				page: 2,
				limit: 5,
			});

			expect(result.total).toBe(12);
			expect(result.page).toBe(2);
			expect(result.limit).toBe(5);
			expect(result.totalPages).toBe(3);
			expect(result.posts).toHaveLength(5);
		});

		it("should filter posts by category slug", async () => {
			const rpgCategory = await createCategory({
				name: "RPG",
				slug: "rpg",
			});

			const workshopCategory = await createCategory({
				name: "Workshops",
				slug: "workshops",
			});

			await createPost({
				authorId,
				title: "RPG Tips",
				slug: "rpg-tips",
				status: "PUBLICADO",
				categoryIds: [rpgCategory.id],
			});

			await createPost({
				authorId,
				title: "Workshop Recap",
				slug: "workshop-recap",
				status: "PUBLICADO",
				categoryIds: [workshopCategory.id],
			});

			const listPostsService = makeListPostsService();
			const result = await listPostsService.execute({
				categorySlug: "rpg",
			});

			expect(result.total).toBe(1);
			expect(result.posts[0].title).toBe("RPG Tips");
			expect(result.posts[0].categories[0].category.slug).toBe("rpg");
		});

		it("should search posts by title, summary and content", async () => {
			await createPost({
				authorId,
				title: "Dragon Lore",
				slug: "dragon-lore",
				content: "Ancient history of dragons",
				status: "PUBLICADO",
			});

			await createPost({
				authorId,
				title: "Session Report",
				slug: "session-report",
				content: "We fought a dragon yesterday",
				status: "PUBLICADO",
			});

			await createPost({
				authorId,
				title: "Unrelated Post",
				slug: "unrelated-post",
				content: "Nothing relevant here",
				status: "PUBLICADO",
			});

			const listPostsService = makeListPostsService();
			const result = await listPostsService.execute({
				search: "dragon",
			});

			expect(result.total).toBe(2);
			expect(result.posts.map((post) => post.slug).sort()).toEqual([
				"dragon-lore",
				"session-report",
			]);
		});

		it("should include author and categories in listed posts", async () => {
			const category = await createCategory({
				name: "News",
				slug: "news",
			});

			await createPost({
				authorId,
				title: "Latest News",
				slug: "latest-news",
				status: "PUBLICADO",
				categoryIds: [category.id],
			});

			const listPostsService = makeListPostsService();
			const result = await listPostsService.execute({});

			expect(result.posts[0].author).toMatchObject({
				id: authorId,
				name: "Test User",
				email: "author@example.com",
			});
			expect(result.posts[0].categories[0].category).toMatchObject({
				name: "News",
				slug: "news",
			});
		});
	});

	describe("GetPostBySlugService", () => {
		it("should return a published post with author and categories", async () => {
			const category = await createCategory({
				name: "Guides",
				slug: "guides",
			});

			const post = await createPost({
				authorId,
				title: "Beginner Guide",
				slug: "beginner-guide",
				content: "How to start playing RPG",
				status: "PUBLICADO",
				categoryIds: [category.id],
			});

			const getPostBySlugService = makeGetPostBySlugService();
			const result = await getPostBySlugService.execute({
				slug: post.slug,
			});

			expect(result.post.id).toBe(post.id);
			expect(result.post.title).toBe("Beginner Guide");
			expect(result.post.author.id).toBe(authorId);
			expect(result.post.categories[0].category.slug).toBe("guides");
		});

		it("should increment view count for published posts", async () => {
			const post = await createPost({
				authorId,
				title: "Popular Post",
				slug: "popular-post",
				status: "PUBLICADO",
			});

			const getPostBySlugService = makeGetPostBySlugService();
			await getPostBySlugService.execute({ slug: post.slug });

			await new Promise((resolve) => setTimeout(resolve, 100));

			const updatedPost = await prisma.post.findUnique({
				where: { id: post.id },
			});

			expect(updatedPost?.viewCount).toBe(1);
		});

		it("should throw PostNotFoundError when slug does not exist", async () => {
			const getPostBySlugService = makeGetPostBySlugService();

			await expect(
				getPostBySlugService.execute({ slug: "missing-post" }),
			).rejects.toBeInstanceOf(PostNotFoundError);
		});

		it("should hide draft posts from public visitors", async () => {
			await createPost({
				authorId,
				title: "Secret Draft",
				slug: "secret-draft",
				status: "RASCUNHO",
			});

			const getPostBySlugService = makeGetPostBySlugService();

			await expect(
				getPostBySlugService.execute({ slug: "secret-draft" }),
			).rejects.toBeInstanceOf(PostNotFoundError);
		});

		it("should hide archived posts from public visitors", async () => {
			await createPost({
				authorId,
				title: "Old Post",
				slug: "old-post",
				status: "ARQUIVADO",
			});

			const getPostBySlugService = makeGetPostBySlugService();

			await expect(
				getPostBySlugService.execute({ slug: "old-post" }),
			).rejects.toBeInstanceOf(PostNotFoundError);
		});

		it("should allow admins to access draft and archived posts", async () => {
			await createPost({
				authorId,
				title: "Admin Draft",
				slug: "admin-draft",
				status: "RASCUNHO",
			});

			await createPost({
				authorId,
				title: "Admin Archive",
				slug: "admin-archive",
				status: "ARQUIVADO",
			});

			const getPostBySlugService = makeGetPostBySlugService();

			const draftResult = await getPostBySlugService.execute({
				slug: "admin-draft",
				isAdmin: true,
			});

			const archivedResult = await getPostBySlugService.execute({
				slug: "admin-archive",
				isAdmin: true,
			});

			expect(draftResult.post.status).toBe("RASCUNHO");
			expect(archivedResult.post.status).toBe("ARQUIVADO");
		});
	});
});
