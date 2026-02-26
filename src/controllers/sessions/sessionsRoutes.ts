import { Router } from "express";
import { validateApproveSession } from "../middlewares/validateApproveSession";
import { validateEmitSession } from "../middlewares/validateEmitSession";
import { validateJWT } from "../middlewares/validateJWT";
import { validateRole } from "../middlewares/validateRole";
import { approveSessionController } from "./approveSessionController";
import { cancelPendingSessionController } from "./cancelSessionController";
import { emitSessionController } from "./emitSessionController";
import { getAllSessionsController } from "./getAllSessionsController";
import { getAvaliableSessionsController } from "./getAvaliableSessionsController";
import { rejectSessionController } from "./rejectSessionController";
import { subscribeUserToSessionController } from "./subscribeUserToSessionController";

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

export default sessionRouter;
