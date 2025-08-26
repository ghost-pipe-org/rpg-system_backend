export class SessionNotPending extends Error{
    constructor(){
        super("Session does not have PENDING status");
    }
}