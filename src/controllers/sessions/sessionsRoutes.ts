import { Router } from "express";
import { getAvaliableSessionsController } from "./getAvaliableSessionsController";
import { subscribeUserToSessionController } from "./subscribeUserToSessionController";
import { validateJWT } from "../middlewares/validateJWT";

const sessionRouter = Router();


sessionRouter.get(
    "/sessions/approved",
    getAvaliableSessionsController,
);

sessionRouter.post(
    "/sessions/:sessionId/subscribe",
    validateJWT(),
    subscribeUserToSessionController,
);

export default sessionRouter;
