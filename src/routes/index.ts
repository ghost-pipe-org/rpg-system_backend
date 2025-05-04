import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// prisma.$connect().catch((e: any) => {
//   console.error("Error connecting to the database:", e);});

const routes = (app: Express) => {
	app
		.route("/")
		.get((req: Request, res: Response) => res.status(200).send("API Node.js"));
};

export default routes;
