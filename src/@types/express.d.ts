import type { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
			};
		}
	}
}

// Type para requests autenticados (após middleware JWT)
export type AuthenticatedRequest = Request & {
	user: {
		id: string;
	};
};
