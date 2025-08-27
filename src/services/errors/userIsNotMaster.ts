export class userIsNotMaster extends Error {
	constructor() {
		super("User is not the master of this session.");
	}
}
