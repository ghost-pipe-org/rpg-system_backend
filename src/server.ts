import app from "./app.js";
import { env } from "./env/index.js";
import { prisma } from "./lib/prisma.js";

const PORT = env.PORT || 3001;

const startServer = async () => {
	try {
		await prisma.$connect();
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
			console.log(
				`API documentation is available at http://localhost:${PORT}/api-docs`,
			);
		});
	} catch (error) {
		console.error("Failed to connect to the database:", error);
	}
};

startServer();
