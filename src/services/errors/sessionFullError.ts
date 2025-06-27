export class SessionFullError extends Error {
    constructor() {
        super("Session has reached maximum capacity");
    }
}
