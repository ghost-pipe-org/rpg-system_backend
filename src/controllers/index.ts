import type { Express, Request, Response } from "express";
import express from "express";
import sessionRouter from "./sessions/sessionsRoutes";
import userRouter from "./users/usersRoutes";

const routes = (app: Express) => {
	app
		.route("/")
		.get((req: Request, res: Response) => res.status(200).send("API Node.js"));
	app.use(express.json(), userRouter, sessionRouter);
};

export default routes;
