import { Router } from "express";
import { validateApproveSession } from "../middlewares/validateApproveSession";
import { validateCancelApprovedSession } from "../middlewares/validateCancelApprovedSession";
import { validateEmitSession } from "../middlewares/validateEmitSession";
import { validateJWT } from "../middlewares/validateJWT";
import { validateRole } from "../middlewares/validateRole";
import { approveSessionController } from "./approveSessionController";
import { cancelApprovedSessionController } from "./cancelApprovedSessionController";
import { cancelPendingSessionController } from "./cancelSessionController";
import { emitSessionController } from "./emitSessionController";
import { getAllSessionsController } from "./getAllSessionsController";
import { getAvaliableSessionsController } from "./getAvaliableSessionsController";
import { rejectSessionController } from "./rejectSessionController";
import { subscribeUserToSessionController } from "./subscribeUserToSessionController";
import { cancelEnrollmentController } from "./cancelEnrollmentController";

const sessionRouter = Router();

//Publicas

sessionRouter.get("/sessions/approved", getAvaliableSessionsController);

//Privadas

sessionRouter.get(
	"/sessions",
	validateJWT(),
	validateRole("ADMIN"),
	getAllSessionsController,
);

sessionRouter.post(
	"/sessions/:sessionId/subscribe",
	validateJWT(),
	validateRole(["PLAYER", "MASTER"]),
	subscribeUserToSessionController,
);

sessionRouter.post(
	"/sessions",
	validateJWT(),
	validateRole("MASTER"),
	validateEmitSession,
	emitSessionController,
);

sessionRouter.patch(
	"/sessions/:sessionId/approve",
	validateJWT(),
	validateRole("ADMIN"),
	validateApproveSession,
	approveSessionController,
);

sessionRouter.patch(
	"/sessions/:sessionId/reject",
	validateJWT(),
	validateRole("ADMIN"),
	rejectSessionController,
);

sessionRouter.delete(
	"/sessions/:sessionId",
	validateJWT(),
	validateRole("MASTER"),
	cancelPendingSessionController,
);

sessionRouter.delete(
	"/sessions/:sessionId/cancel",
	validateJWT(),
	validateRole("MASTER"),
	validateCancelApprovedSession,
	cancelApprovedSessionController,
);

sessionRouter.delete(
	"/sessions/:sessionId/enrollments/me",
	validateJWT(),
	validateRole(["PLAYER", "MASTER"]),
	cancelEnrollmentController,
);

export default sessionRouter;
