import { env } from "@/env";
import app from "./src/app";

const PORT = env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando no link http://localhost:${PORT}/`);
});
