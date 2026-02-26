import { type Express, Router } from "express";
import { validateAuthenticate } from "../middlewares/validateAuthenticate";
import { validateJWT } from "../middlewares/validateJWT";
import { validateRegister } from "../middlewares/validateRegister";
import { validateUpdateProfile } from "../middlewares/validateUpdateProfile";
import { authenticateController } from "./authenticateController";
import { getEmittedSessionsController } from "./getEmittedSessionsController";
import { getEnrolledSessionsController } from "./getEnrolledSessionsController";
import { getUserProfileController } from "./getUserProfileController";
import { registerController } from "./registerController";
import { updateUserProfileController } from "./updateUserProfileController";

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

userRouter.get("/users/profile", validateJWT(), getUserProfileController);
userRouter.patch(
	"/users/profile",
	validateJWT(),
	validateUpdateProfile,
	updateUserProfileController,
);

export default userRouter;
