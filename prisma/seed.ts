import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { env } from "../src/env";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Iniciando seed do banco de dados...");

	// Verifica se as variáveis de ambiente do admin estão definidas
	const adminEmail = env.ADMIN_EMAIL;
	const adminPassword = env.ADMIN_PASSWORD;
	const adminName = env.ADMIN_NAME || "Administrador do Sistema";

	if (!adminEmail || !adminPassword) {
		console.log("⚠️  ADMIN_EMAIL e ADMIN_PASSWORD não definidos no .env");
		console.log("   Pulando criação do administrador...");
		console.log(
			"   Para criar o admin, defina essas variáveis no arquivo .env",
		);
		return;
	}

	// Verifica se já existe um admin no sistema
	const existingAdmin = await prisma.user.findFirst({
		where: { role: "ADMIN" },
	});

	if (existingAdmin) {
		console.log("✅ Admin já existe no sistema:", existingAdmin.email);
		console.log("   Apenas um admin é permitido no sistema.");
		return;
	}

	try {
		// Hash da senha do admin
		const passwordHash = await hash(adminPassword, 6);

		// Cria o admin único
		const admin = await prisma.user.create({
			data: {
				name: adminName,
				email: adminEmail,
				passwordHash: passwordHash,
				role: "ADMIN",
				enrollment: "000000001", // Matrícula especial para admin
			},
		});

		console.log("✅ Admin criado com sucesso!");
		console.log(`   Nome: ${admin.name}`);
		console.log(`   Email: ${admin.email}`);
		console.log(`   Role: ${admin.role}`);
		console.log(
			"   🔐 Use essas credenciais para fazer login como administrador.",
		);
	} catch (error) {
		console.error("❌ Erro ao criar admin:", error);
		throw error;
	}
}

main()
	.catch((e) => {
		console.error("❌ Erro no seed:", e);
		process.exit(1);
	})
	.finally(async () => {
		console.log("🔌 Desconectando do banco de dados...");
		await prisma.$disconnect();
	});
