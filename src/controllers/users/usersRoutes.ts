import { Router, type Express } from "express";
import { registerController } from "./registerController";
import { authenticateController } from "./authenticateController";
import { validateRegister } from "../middlewares/validateRegister";
import { validateAuthenticate } from "../middlewares/validateAuthenticate";

const userRouter = Router();

userRouter.post("/users", validateRegister, registerController);
userRouter.post("/users/authenticate", validateAuthenticate, authenticateController);

export default userRouter;
