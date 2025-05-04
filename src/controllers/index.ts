import type { Express, Request, Response } from "express";
import { usersRoutes } from "./users/usersRoutes";
import express from "express";

const routes = (app: Express) => {
    app
      .route("/")
      .get((req: Request, res: Response) => res.status(200).send("API Node.js"));
    app.use(express.json(), usersRoutes);
  };
  
  export default routes;