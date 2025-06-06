export class InvalidSessionError extends Error {
    constructor() {
        super("Invalid session.");
        this.name = "InvalidSessionError";
    }
}