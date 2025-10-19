import { type Express, Router } from "express";
import { validateAuthenticate } from "../middlewares/validateAuthenticate";
import { validateJWT } from "../middlewares/validateJWT";
import { validateRegister } from "../middlewares/validateRegister";
import { authenticateController } from "./authenticateController";
import { getEmittedSessionsController } from "./getEmittedSessionsController";
import { getEnrolledSessionsController } from "./getEnrolledSessionsController";
import { registerController } from "./registerController";

const userRouter = Router();

userRouter.post("/users", validateRegister, registerController);
userRouter.post(
	"/users/authenticate",
	validateAuthenticate,
	authenticateController,
);

// Protected routes
userRouter.get(
	"/my-emmitted-sessions",
	validateJWT(),
	getEmittedSessionsController,
);
userRouter.get(
	"/my-enrolled-sessions",
	validateJWT(),
	getEnrolledSessionsController,
);

export default userRouter;
