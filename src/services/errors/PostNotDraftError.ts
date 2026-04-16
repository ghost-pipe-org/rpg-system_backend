export class PostNotDraftError extends Error {
	constructor() {
		super("Post not on draft.");
		this.name = "PostNotDraftError";
	}
}
