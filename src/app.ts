import cors from "cors";
import express from "express";
import routes from "./controllers/index";
import { setupSwagger } from "./swagger";

const app = express();

// Adicione os middlewares globais aqui
app.use(
	cors({
		origin: ["https://rpg-system-frontend.vercel.app", "http://localhost:5173"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(express.json());

// Setup Swagger documentation
setupSwagger(app);

routes(app);

export default app;
