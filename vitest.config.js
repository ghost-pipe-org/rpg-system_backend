import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	test: {
		globals: true,
		environment: "node",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{js,ts}"],
		exclude: ["node_modules", "dist"],
		env: {
			DATABASE_URL: "postgresql://test:1234@localhost:5433/test",
			NODE_ENV: "test",
			JWT_SECRET: "test-jwt-secret-for-testing-only",
		},
		testTimeout: 30000,
		hookTimeout: 30000,
		// Usar forks para melhor isolamento entre arquivos de teste
		pool: "forks",
		poolOptions: {
			forks: {
				singleFork: true,
			},
		},
		// Executar testes sequencialmente para evitar problemas de concorrência no banco
		fileParallelism: false,
		// Isolar cada arquivo de teste
		isolate: true,
		// Configuração para retry em caso de falha
		retry: 0,
		// Logging para debug
		logLevel: "info",
	},
});
