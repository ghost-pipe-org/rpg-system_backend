#!/bin/sh
set -e

echo "🔄 Executando migrations do Prisma..."
npx prisma migrate deploy

echo "✅ Migrations concluídas!"
echo "🚀 Iniciando servidor..."
exec node dist/server.js
