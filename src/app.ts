import express from "express";
import routes from "./controllers/index";

const app = express();
routes(app);
export default app;
