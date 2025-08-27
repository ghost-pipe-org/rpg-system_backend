import { CancelApprovedSessionService } from "../sessions/cancelApprovedSessionService";

export function makeCancelApprovedSessionService() {
	return new CancelApprovedSessionService();
}