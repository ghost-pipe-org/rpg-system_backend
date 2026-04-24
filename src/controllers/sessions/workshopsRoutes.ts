import { Router } from "express";
import { validateApproveSession } from "../middlewares/validateApproveSession";
import { validateCancelApprovedSession } from "../middlewares/validateCancelApprovedSession";
import { validateEmitWorkshop } from "../middlewares/validateEmitWorkshop";
import { validateJWT } from "../middlewares/validateJWT";
import { validateRole } from "../middlewares/validateRole";
import { approveSessionController } from "./approveSessionController";
import { cancelApprovedSessionController } from "./cancelApprovedSessionController";
import { cancelEnrollmentController } from "./cancelEnrollmentController";
import { cancelPendingSessionController } from "./cancelSessionController";
import { emitWorkshopController } from "./emitWorkshopController";
import { getAllWorkshopsController } from "./getAllWorkshopsController";
import { getAvailableWorkshopsController } from "./getAvailableWorkshopsController";
import { rejectSessionController } from "./rejectSessionController";
import { subscribeUserToSessionController } from "./subscribeUserToSessionController";

const workshopRouter = Router();

workshopRouter.get("/workshops/approved", getAvailableWorkshopsController);

workshopRouter.get(
	"/workshops",
	validateJWT(),
	validateRole("ADMIN"),
	getAllWorkshopsController,
);

workshopRouter.post(
	"/workshops",
	validateJWT(),
	validateRole("MASTER"),
	validateEmitWorkshop,
	emitWorkshopController,
);

workshopRouter.patch(
	"/workshops/:sessionId/approve",
	validateJWT(),
	validateRole("ADMIN"),
	validateApproveSession,
	approveSessionController,
);

workshopRouter.patch(
	"/workshops/:sessionId/reject",
	validateJWT(),
	validateRole("ADMIN"),
	rejectSessionController,
);

workshopRouter.delete(
	"/workshops/:sessionId",
	validateJWT(),
	validateRole("MASTER"),
	cancelPendingSessionController,
);

workshopRouter.delete(
	"/workshops/:sessionId/cancel",
	validateJWT(),
	validateRole("MASTER"),
	validateCancelApprovedSession,
	cancelApprovedSessionController,
);

workshopRouter.post(
	"/workshops/:sessionId/subscribe",
	validateJWT(),
	validateRole(["PLAYER", "MASTER"]),
	subscribeUserToSessionController,
);

workshopRouter.delete(
	"/workshops/:sessionId/enrollments/me",
	validateJWT(),
	validateRole(["PLAYER", "MASTER"]),
	cancelEnrollmentController,
);

export default workshopRouter;
