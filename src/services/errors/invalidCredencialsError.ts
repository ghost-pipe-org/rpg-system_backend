export class InvalidCredencialsError extends Error {
    constructor() {
        super("Invalid credentials.");
        this.name = "InvalidCredencialsError";
    }
}