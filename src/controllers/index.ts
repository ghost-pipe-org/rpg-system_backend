import type { Express, Request, Response } from "express";
import userRouter from "./users/usersRoutes";
import express from "express";
import sessionRouter from "./sessions/sessionsRoutes";

const routes = (app: Express) => {
    app
      .route("/")
      .get((req: Request, res: Response) => res.status(200).send("API Node.js"));
    app.use(express.json(), userRouter, sessionRouter);
  };
  
  export default routes;