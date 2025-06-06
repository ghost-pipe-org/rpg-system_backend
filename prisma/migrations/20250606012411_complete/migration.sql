-- Adiciona a coluna como opcional
ALTER TABLE "Session" ADD COLUMN "creatorId" UUID;

-- Atualiza os registros existentes com um ID de usuário válido
UPDATE "Session" SET "creatorId" = '36293cfb-7ed6-4647-ab99-44ed2100015c';

-- Torna a coluna obrigatória
ALTER TABLE "Session" ALTER COLUMN "creatorId" SET NOT NULL;

-- Cria a foreign key
ALTER TABLE "Session" ADD CONSTRAINT "Session_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;