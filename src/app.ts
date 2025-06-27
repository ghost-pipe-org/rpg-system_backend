import express from "express";
import cors from "cors";
import routes from "./controllers/index";

const app = express();

// Adicione os middlewares globais aqui
app.use(cors({
  origin: "https://rpg-system-frontend.vercel.app",
  credentials: true
}));
app.use(express.json());

routes(app);

export default app;
