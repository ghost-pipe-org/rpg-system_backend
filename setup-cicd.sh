#!/bin/bash

# Script para configurar CI/CD com GitHub Actions
# Uso: ./setup-cicd.sh

set -e

PROJECT_ID="node-apis-475620"
SA_NAME="github-actions"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
KEY_FILE="github-actions-key.json"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🔧 Configurando CI/CD para GitHub Actions...${NC}\n"

# 1. Verificar se service account já existe
echo -e "${GREEN}1️⃣  Verificando Service Account...${NC}"
if gcloud iam service-accounts describe ${SA_EMAIL} --project=${PROJECT_ID} 2>/dev/null; then
  echo -e "${YELLOW}⚠️  Service Account já existe.${NC}"
else
  echo "Criando Service Account..."
  gcloud iam service-accounts create ${SA_NAME} \
    --display-name="GitHub Actions Deploy" \
    --project=${PROJECT_ID}
  echo -e "${GREEN}✅ Service Account criada!${NC}"
fi

# 2. Configurar permissões
echo -e "\n${GREEN}2️⃣  Configurando permissões...${NC}"

ROLES=(
  "roles/run.admin"
  "roles/storage.admin"
  "roles/cloudsql.client"
  "roles/iam.serviceAccountUser"
  "roles/secretmanager.secretAccessor"
  "roles/artifactregistry.writer"
)

for role in "${ROLES[@]}"; do
  echo "Adicionando role: $role"
  gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="$role" \
    --condition=None \
    --quiet 2>/dev/null || echo "  (já existe)"
done

echo -e "${GREEN}✅ Permissões configuradas!${NC}"

# 3. Criar chave JSON
echo -e "\n${GREEN}3️⃣  Gerando chave JSON...${NC}"
if [ -f "$KEY_FILE" ]; then
  echo -e "${YELLOW}⚠️  Arquivo $KEY_FILE já existe. Removendo...${NC}"
  rm -f $KEY_FILE
fi

gcloud iam service-accounts keys create ${KEY_FILE} \
  --iam-account=${SA_EMAIL} \
  --project=${PROJECT_ID}

echo -e "${GREEN}✅ Chave criada: ${KEY_FILE}${NC}"

# 4. Obter informações necessárias
echo -e "\n${GREEN}4️⃣  Coletando informações...${NC}"

CONNECTION_NAME=$(gcloud sql instances describe rpg-system-db \
  --format='value(connectionName)' \
  --project=${PROJECT_ID} 2>/dev/null || echo "N/A")

# 5. Mostrar instruções
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 PRÓXIMOS PASSOS - Configurar GitHub Secrets${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "Vá em: ${GREEN}Settings → Secrets and variables → Actions${NC}"
echo -e "E crie os seguintes secrets:\n"

echo -e "${YELLOW}1. GCP_PROJECT_ID${NC}"
echo -e "   Valor: ${GREEN}${PROJECT_ID}${NC}\n"

echo -e "${YELLOW}2. GCP_SA_KEY${NC}"
echo -e "   Valor: Cole o conteúdo completo do arquivo ${GREEN}${KEY_FILE}${NC}"
echo -e "   Copie com: ${BLUE}cat ${KEY_FILE}${NC}\n"

echo -e "${YELLOW}3. CLOUD_SQL_INSTANCE${NC}"
if [ "$CONNECTION_NAME" != "N/A" ]; then
  echo -e "   Valor: ${GREEN}${CONNECTION_NAME}${NC}\n"
else
  echo -e "   ${YELLOW}⚠️  Cloud SQL não encontrado. Configure manualmente.${NC}\n"
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# 6. Copiar chave para clipboard (se xclip estiver disponível)
if command -v xclip &> /dev/null; then
  cat ${KEY_FILE} | xclip -selection clipboard
  echo -e "${GREEN}✅ Conteúdo da chave copiado para área de transferência!${NC}\n"
fi

# 7. Instruções finais
echo -e "${BLUE}📝 Depois de configurar os secrets no GitHub:${NC}"
echo -e "   1. Faça commit e push"
echo -e "   2. O deploy acontecerá automaticamente!"
echo -e "   3. Veja o progresso em: ${GREEN}GitHub → Actions${NC}\n"

echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "   Depois de adicionar a chave ao GitHub,"
echo -e "   delete o arquivo local:"
echo -e "   ${BLUE}rm ${KEY_FILE}${NC}\n"

echo -e "${GREEN}✅ Configuração CI/CD concluída!${NC}"
