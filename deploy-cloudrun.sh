#!/bin/bash

# Script de Deploy para Google Cloud Run
# Uso: ./deploy-cloudrun.sh

set -e

# Variáveis - CONFIGURE ESTAS VARIÁVEIS
PROJECT_ID="node-apis-475620"
REGION="europe-west1"
SERVICE_NAME="rpg-system-api"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
INSTANCE_CONNECTION_NAME="${PROJECT_ID}:${REGION}:rpg-system-db"
DB_PASSWORD="34212200aA"  # CONFIGURE A SENHA DO BANCO
JWT_SECRET="bd9e9e6d25c1dbdf25daeb940d427977"  # CONFIGURE O JWT SECRET

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando deploy do RPG System Backend...${NC}"

# 1. Configurar projeto
echo -e "${GREEN}📋 Configurando projeto...${NC}"
gcloud config set project ${PROJECT_ID}

# 2. Habilitar APIs necessárias
echo -e "${GREEN}🔧 Habilitando APIs necessárias...${NC}"
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com

# 3. Build da imagem usando Cloud Build
echo -e "${GREEN}🏗️  Fazendo build da imagem...${NC}"
gcloud builds submit --config cloudbuild.yaml

# 4. Deploy no Cloud Run
echo -e "${GREEN}🚀 Fazendo deploy no Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --add-cloudsql-instances ${INSTANCE_CONNECTION_NAME} \
  --set-env-vars DATABASE_URL="postgresql://postgres:${DB_PASSWORD}@localhost/rpg-system-backend?host=/cloudsql/${INSTANCE_CONNECTION_NAME}" \
  --set-env-vars NODE_ENV="production" \
  --set-env-vars JWT_SECRET="${JWT_SECRET}" \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10 \
  --min-instances 0

echo -e "${GREEN}✅ Deploy concluído!${NC}"
echo -e "${BLUE}🌐 URL do serviço:${NC}"
gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)'
