export class AlreadyEnrolledError extends Error {
    constructor() {
        super("User is already enrolled in this session.");
        this.name = "AlreadyEnrolledError";
    }
}