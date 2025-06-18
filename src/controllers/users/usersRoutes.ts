import { Router, type Express } from "express";
import { registerController } from "./registerController";
import { authenticateController } from "./authenticateController";
import { getEmittedSessionsController } from "./getEmittedSessionsController";
import { getEnrolledSessionsController } from "./getEnrolledSessionsController";
import { validateRegister } from "../middlewares/validateRegister";
import { validateAuthenticate } from "../middlewares/validateAuthenticate";
import { validateJWT } from "../middlewares/validateJWT";

const userRouter = Router();

userRouter.post("/users", validateRegister, registerController);
userRouter.post("/users/authenticate", validateAuthenticate, authenticateController);

// Protected routes
userRouter.get("/my-emmitted-sessions", validateJWT(), getEmittedSessionsController);
userRouter.get("/my-enrolled-sessions", validateJWT(), getEnrolledSessionsController);

export default userRouter;
