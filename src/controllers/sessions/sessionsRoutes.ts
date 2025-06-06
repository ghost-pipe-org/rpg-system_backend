import { Router } from "express";
import { getAvaliableSessionsController } from "./getAvaliableSessionsController";
import { subscribeUserToSessionController } from "./subscribeUserToSessionController";
import { validateJWT } from "../middlewares/validateJWT";
import { emitSessionController } from "./emitSessionController";
import { approveSessionController } from "./approveSessionController";
import { rejectSessionController } from "./rejectSessionController";
import { validateEmitSession } from "../middlewares/validateEmitSession";

const sessionRouter = Router();

//Publicas

sessionRouter.get(
    "/sessions/approved",
    getAvaliableSessionsController,
);

//Privadas

sessionRouter.post(
    "/sessions/:sessionId/subscribe",
    validateJWT(),
    subscribeUserToSessionController,
);

sessionRouter.post(
    "/sessions",
    validateJWT(),
    validateEmitSession,
    emitSessionController,
)

sessionRouter.patch(
    "/sessions/:sessionId/approve",
    validateJWT(),
    approveSessionController,
)

sessionRouter.patch(
    "/sessions/:sessionId/reject",
    validateJWT(),
    rejectSessionController,
)

export default sessionRouter;
