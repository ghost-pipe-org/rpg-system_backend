# 🎲 RPG System Backend API

> Uma API REST completa para sistema de inscrições de mesas de RPG, desenvolvida em Node.js com TypeScript.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-brightgreen)
![Tests](https://img.shields.io/badge/Tests-53%20passing-brightgreen)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Documentação da API](#documentação-da-api)
- [Instalação](#instalação)
- [Executando com Docker](#executando-com-docker)
- [Configuração](#configuração)
- [Testes](#testes)
- [API Endpoints](#api-endpoints)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Git Flow](#git-flow)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O **RPG System Backend** é uma API REST que gerencia um sistema completo de inscrições para mesas de RPG. Permite que mestres criem sessões, jogadores se inscrevam, e administradores gerenciem todo o sistema.

### ✨ Principais Características

- 🔐 **Autenticação JWT** com roles de usuário
- 🎮 **Gestão de Sessões** de RPG completa
- 📝 **Sistema de Inscrições** automatizado
- 👥 **Múltiplos Tipos de Usuário** (Player, Master, Admin)
- 🛡️ **Validação Robusta** de dados
- 📚 **Documentação Swagger** interativa
- 🐳 **Docker** para desenvolvimento e produção
- 🧪 **Cobertura de Testes** de 53 casos
- 📊 **Banco de Dados** PostgreSQL com Prisma ORM

## 🚀 Tecnologias

### Core
- **[Node.js 18+](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript 5.0+](https://www.typescriptlang.org/)** - Tipagem estática
- **[Express.js](https://expressjs.com/)** - Framework web
- **[Prisma](https://www.prisma.io/)** - ORM e Database toolkit

### Database
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados principal
- **[Prisma Migrate](https://www.prisma.io/migrate)** - Migrations e schema

### Documentação
- **[Swagger/OpenAPI 3.0](https://swagger.io/)** - Documentação interativa da API
- **[swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)** - Geração de specs
- **[swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)** - Interface web

### Autenticação & Segurança
- **[JSON Web Tokens (JWT)](https://jwt.io/)** - Autenticação
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Hash de senhas
- **[CORS](https://github.com/expressjs/cors)** - Cross-Origin Resource Sharing

### Validação & Testing
- **[Zod](https://zod.dev/)** - Validação de schemas
- **[Vitest](https://vitest.dev/)** - Framework de testes
- **[Supertest](https://github.com/visionmedia/supertest)** - Testes HTTP

### Desenvolvimento
- **[TSX](https://github.com/esbuild-kit/tsx)** - TypeScript execution
- **[Biome](https://biomejs.dev/)** - Linting e formatação
- **[TSUP](https://tsup.egoist.dev/)** - Build tool
- **[Docker](https://www.docker.com/)** - Containerização

## 🎮 Funcionalidades

### 👤 Gestão de Usuários
- ✅ Registro com `masterConfirm` (boolean) em vez de role
- ✅ Matrícula obrigatória apenas para mestres
- ✅ Telefone opcional para todos os usuários
- ✅ Autenticação com email/senha
- ✅ Sistema de roles (PLAYER, MASTER, ADMIN)

### 🎲 Gestão de Sessões
- ✅ Criação de sessões por Mestres
- ✅ Sistema de múltiplas datas possíveis
- ✅ Configuração de min/max jogadores
- ✅ Sistema de RPG específico (D&D 5e, Pathfinder, etc.)
- ✅ Período definido (MANHÃ, TARDE, NOITE)
- ✅ Status de sessões (PENDENTE, APROVADA, REJEITADA, CANCELADA)
- ✅ Requisitos opcionais para participação

### 📝 Sistema de Inscrições
- ✅ Inscrição de jogadores em sessões
- ✅ Controle de vagas disponíveis
- ✅ Prevenção de múltiplas inscrições
- ✅ Status de inscrição (PENDENTE, APROVADO, REJEITADO)

### 🛡️ Administração
- ✅ Aprovação/rejeição de sessões
- ✅ Visualização de todas as sessões
- ✅ Gestão completa do sistema

## 📚 Documentação da API

A API possui **documentação Swagger interativa** completa e sempre atualizada:

- **🌐 Interface Web**: `http://localhost:3001/api-docs`
- **� JSON Schema**: `http://localhost:3001/api-docs.json`

### Funcionalidades da Documentação:
- ✅ **Interface interativa** para testar endpoints
- ✅ **Autenticação JWT** integrada
- ✅ **Schemas completos** de request/response
- ✅ **Exemplos práticos** para cada endpoint
- ✅ **Validações e regras de negócio** documentadas
- ✅ **Organização por tags** (Usuários, Sessões, etc.)

### Como Usar:
1. Acesse `http://localhost:3001/api-docs`
2. Para endpoints protegidos, faça login em `/users/authenticate`
3. Copie o token retornado
4. Clique em "Authorize" e cole o token
5. Teste os endpoints diretamente na interface

## �📦 Instalação

### Pré-requisitos
- Node.js 18 ou superior
- PostgreSQL 15 ou superior (ou Docker)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/ghost-pipe-org/api-test.git
cd api-test
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

### 4. Configure o banco de dados
```bash
# Execute as migrations
npm run db:dev

# (Opcional) Execute o seed
npm run db:seed
```

### 5. Inicie o servidor
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm start
```

A API estará disponível em:
- **API**: http://localhost:3001
- **Documentação**: http://localhost:3001/api-docs

## 🐳 Executando com Docker

### Opção 1: Ambiente Completo (Recomendado)

```bash
# Clone o projeto
git clone https://github.com/ghost-pipe-org/api-test.git
cd api-test

# Construa e execute todos os serviços
docker-compose up --build

# Para executar em background
docker-compose up -d --build
```

Serviços disponíveis:
- **API**: http://localhost:3001
- **Documentação**: http://localhost:3001/api-docs
- **PostgreSQL**: localhost:5432

### Opção 2: Apenas Banco de Dados

```bash
# Execute apenas o PostgreSQL
docker-compose up postgres

# Em outro terminal, execute a aplicação localmente
npm run start:dev
```

### Opção 3: Ambiente de Desenvolvimento

```bash
# Para desenvolvimento com hot-reload
docker-compose up --build

# Os arquivos são sincronizados via volume
# Qualquer alteração no código reinicia automaticamente
```

### Comandos Úteis Docker

```bash
# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Limpar volumes (dados do banco)
docker-compose down -v

# Rebuild completo
docker-compose down
docker-compose build --no-cache
docker-compose up

# Executar comandos dentro do container
docker-compose exec app npm run db:seed
docker-compose exec app npm test

# Acessar o shell do container
docker-compose exec app sh
```

### Troubleshooting Docker

**Problema**: Porta em uso
```bash
# Matar processos na porta 3001
sudo lsof -t -i:3001 | xargs sudo kill -9

# Ou alterar a porta no docker-compose.yml
```

**Problema**: Banco não conecta
```bash
# Verificar se o PostgreSQL está rodando
docker-compose ps

# Verificar logs do banco
docker-compose logs postgres

# Recriar o banco
docker-compose down postgres
docker-compose up postgres
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/rpg_system"

# JWT
JWT_SECRET="seu-jwt-secret-super-seguro"

# Server
PORT=3000
NODE_ENV=development
```

### Estrutura do Banco de Dados

```sql
-- Principais tabelas
Users (id, name, email, password, enrollment, role)
Sessions (id, title, description, system, status, dates, location)
Enrollments (userId, sessionId, enrollmentStatus)
```

## 🔌 API Endpoints

> 📚 **Documentação Completa**: Acesse `http://localhost:3001/api-docs` para a documentação interativa e atualizada.

### 🔐 Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/users` | Registrar novo usuário | ❌ |
| `POST` | `/users/authenticate` | Login de usuário | ❌ |

#### Exemplo de Registro (Player)
```bash
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "phoneNumber": "(11) 99999-9999",
  "masterConfirm": false
}
```

#### Exemplo de Registro (Master)
```bash
POST /users
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "password": "senha123",
  "enrollment": "123456789",
  "phoneNumber": "(11) 88888-8888",
  "masterConfirm": true
}
```

#### Exemplo de Login
```bash
POST /users/authenticate
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

### 🎲 Sessões

| Método | Endpoint | Descrição | Roles |
|--------|----------|-----------|-------|
| `GET` | `/sessions/approved` | Listar sessões aprovadas | ❌ |
| `GET` | `/sessions` | Listar todas as sessões | `ADMIN` |
| `POST` | `/sessions` | Criar nova sessão | `MASTER` |
| `POST` | `/sessions/:id/subscribe` | Inscrever-se em sessão | `PLAYER`, `MASTER` |
| `PATCH` | `/sessions/:id/approve` | Aprovar sessão | `ADMIN` |
| `PATCH` | `/sessions/:id/reject` | Rejeitar sessão | `ADMIN` |

#### Exemplo de Criação de Sessão
```bash
POST /sessions
Authorization: Bearer seu-jwt-token
Content-Type: application/json

{
  "title": "Campanha de D&D: A Maldição de Strahd",
  "description": "Uma aventura gótica de horror em Barovia",
  "requirements": "Conhecimento básico de D&D 5e",
  "system": "D&D 5e",
  "possibleDates": [
    "2025-08-20T19:00:00Z",
    "2025-08-21T19:00:00Z"
  ],
  "period": "NOITE",
  "minPlayers": 3,
  "maxPlayers": 6,
  "location": "Sala 201 - Prédio de Humanas"
}
```

### 👤 Perfil do Usuário

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/my-emmitted-sessions` | Sessões criadas pelo usuário | ✅ |
| `GET` | `/my-enrolled-sessions` | Sessões inscritas pelo usuário | ✅ |

## 🧪 Testes

O projeto possui **53 testes automatizados** cobrindo todos os endpoints e cenários principais.

### 🚀 Executando Testes Localmente

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Configurar banco de teste
cp .env.example .env.test

# Executar todos os testes
npm test

# Executar em modo watch (desenvolvimento)
npm run test:watch

# Executar com interface gráfica
npm run test:ui

# Executar apenas uma vez
npm run test:run

# Gerar relatório de cobertura
npm run test:coverage
```

### 🐳 Executando Testes com Docker

#### Opção 1: Ambiente Isolado de Teste
```bash
# Subir banco específico para testes
docker-compose -f docker-compose.test.yml up -d

# Executar testes no container
docker-compose -f docker-compose.test.yml exec postgres-test psql -U test -d test -c "SELECT 1;"

# Configurar variável de ambiente para testes
export DATABASE_URL="postgresql://test:1234@localhost:5433/test"

# Executar migrations de teste
npx prisma migrate dev --name init

# Executar testes
npm test
```

#### Opção 2: Container da Aplicação
```bash
# Construir e executar ambiente completo
docker-compose up --build -d

# Executar testes dentro do container
docker-compose exec app npm test

# Ver relatório de cobertura
docker-compose exec app npm run test:coverage
```

#### Opção 3: Pipeline Completo (CI/CD)
```bash
# Script completo para pipeline de testes
#!/bin/bash

# 1. Subir banco de teste
docker-compose -f docker-compose.test.yml up -d

# 2. Aguardar banco estar pronto
until docker-compose -f docker-compose.test.yml exec postgres-test pg_isready -U test; do
  echo "Aguardando PostgreSQL..."
  sleep 1
done

# 3. Configurar ambiente
export DATABASE_URL="postgresql://test:1234@localhost:5433/test"

# 4. Executar migrations
npx prisma migrate dev --name test-setup

# 5. Executar testes
npm run test:coverage

# 6. Limpar ambiente
docker-compose -f docker-compose.test.yml down -v
```

### 📊 Estrutura de Testes

```
src/test/
├── controllers/
│   ├── health.test.ts           # 1 teste  - Health check
│   ├── sessions-admin.test.ts   # 15 testes - Admin endpoints
│   ├── sessions-protected.test.ts # 14 testes - Protected sessions
│   ├── sessions-public.test.ts  # 6 testes  - Public sessions
│   ├── users-protected.test.ts  # 8 testes  - Protected user endpoints
│   └── users.test.ts           # 9 testes  - User registration/auth
├── helpers.ts                   # Utilitários de teste
└── setup.ts                    # Configuração global
```

### 🎯 Cobertura de Testes

Os testes cobrem:

**✅ Autenticação:**
- Registro de usuários (PLAYER/MASTER)
- Login com credenciais válidas/inválidas
- Validação de JWT tokens
- Middleware de autorização

**✅ Gestão de Sessões:**
- Criação por mestres
- Aprovação/rejeição por admins
- Inscrições de jogadores
- Validações de business rules

**✅ Validações:**
- Schemas de entrada
- Regras de negócio
- Permissões por role
- Limites de vagas

**✅ Cenários de Erro:**
- Dados inválidos
- Permissões negadas
- Recursos não encontrados
- Conflitos de dados

### 🔧 Configuração de Teste

**Arquivo `.env.test`:**
```env
DATABASE_URL="postgresql://test:1234@localhost:5433/test"
JWT_SECRET="test-jwt-secret"
NODE_ENV="test"
```

**Comandos Úteis:**
```bash
# Rodar apenas testes de usuários
npm test -- users

# Rodar apenas testes de sessões
npm test -- sessions

# Rodar testes em modo debug
npm test -- --reporter=verbose

# Rodar testes com timeout customizado
npm test -- --timeout=10000
```

## 📂 Estrutura do Projeto

```
.
├── prisma/                 # Database schema e migrations
│   ├── schema.prisma       # Schema do banco de dados
│   ├── seed.ts            # Dados iniciais
│   └── migrations/        # Migrations do Prisma
├── src/
│   ├── @types/            # Definições de tipos TypeScript
│   ├── controllers/       # Controllers da API
│   │   ├── middlewares/   # Middlewares de validação
│   │   ├── sessions/      # Endpoints de sessões
│   │   └── users/         # Endpoints de usuários
│   ├── env/               # Configuração de environment
│   ├── lib/               # Bibliotecas e utilitários
│   ├── repositories/      # Camada de dados (Prisma + In-Memory)
│   ├── services/          # Lógica de negócio
│   ├── swagger/           # Documentação da API
│   │   ├── swaggerConfig.ts    # Configuração e schemas
│   │   ├── swaggerPaths.ts     # Definições de rotas
│   │   └── index.ts            # Middleware do Swagger
│   └── test/              # Testes automatizados
├── .github/workflows/     # CI/CD Pipeline
├── docker-compose.yml     # Docker desenvolvimento
├── docker-compose.test.yml # Docker para testes
├── Dockerfile            # Container da aplicação
├── package.json
├── SWAGGER_DOCS.md       # Documentação do Swagger
├── GIT_FLOW_TUTORIAL.md  # Tutorial de Git Flow
└── README.md
```

### 🏗️ Arquitetura

O projeto segue uma **arquitetura em camadas** bem definida:

**📊 Camada de Dados (`repositories/`)**
- Abstração do banco de dados
- Implementações Prisma e In-Memory
- Interface comum para todas as operações

**⚙️ Camada de Negócio (`services/`)**
- Regras de negócio isoladas
- Validações específicas do domínio
- Tratamento de erros customizados

**🌐 Camada de Apresentação (`controllers/`)**
- Endpoints da API REST
- Middlewares de validação
- Transformação de dados HTTP

**📚 Documentação (`swagger/`)**
- Schemas OpenAPI 3.0
- Documentação sem comentários no código
- Interface interativa para testes

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/rpg_system"

# JWT
JWT_SECRET="seu-jwt-secret-super-seguro"

# Server
PORT=3001
NODE_ENV=development

# CORS (Opcional)
FRONTEND_URL="http://localhost:5173"
```

### Estrutura do Banco de Dados

```sql
-- Enums
UserRole: PLAYER | MASTER | ADMIN
SessionStatus: PENDENTE | APROVADA | REJEITADA | CANCELADA
SessionPeriod: MANHA | TARDE | NOITE
EnrollmentStatus: PENDENTE | APROVADO | REJEITADO

-- Principais tabelas
Users (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  passwordHash VARCHAR(255),
  enrollment VARCHAR(9),     -- Obrigatório apenas para MASTER
  phoneNumber VARCHAR(20),   -- Opcional
  role UserRole DEFAULT PLAYER,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
)

Sessions (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  requirements TEXT,         -- Opcional
  system VARCHAR(100),       -- Ex: "D&D 5e"
  location VARCHAR(255),
  status SessionStatus DEFAULT PENDENTE,
  period SessionPeriod,
  minPlayers INTEGER,
  maxPlayers INTEGER,
  approvedDate TIMESTAMP,
  cancelEvent TEXT,
  masterId UUID REFERENCES Users(id),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
)

SessionPossibleDate (
  id UUID PRIMARY KEY,
  sessionId UUID REFERENCES Sessions(id),
  date TIMESTAMP
)

SessionEnrollment (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES Users(id),
  sessionId UUID REFERENCES Sessions(id),
  status EnrollmentStatus DEFAULT PENDENTE,
  createdAt TIMESTAMP,
  UNIQUE(userId, sessionId)
)
```

## 🔄 CI/CD

O projeto utiliza **GitHub Actions** para CI/CD automatizado:

```yaml
# .github/workflows/ci.yml
- ✅ **Linting** com Biome
- ✅ **Type checking** com TypeScript  
- ✅ **Testes automatizados** com Vitest
- ✅ **Database migrations** com Prisma
- ✅ **Build validation**
- ✅ **Docker build** test
```

### Scripts Disponíveis

```json
{
  "start": "tsx server.ts",
  "start:dev": "tsx watch server.ts",
  "build": "tsup src",
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:ui": "vitest --ui", 
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage",
  "db:dev": "prisma migrate dev",
  "db:seed": "tsx prisma/seed.ts"
}
```

## 🌳 Git Flow

Este projeto segue o **Git Flow** para organização de branches e desenvolvimento de features.

### 📖 Tutorial Completo
Para um guia detalhado sobre como desenvolver features seguindo nossos padrões, consulte:

**➡️ [GIT_FLOW_TUTORIAL.md](./GIT_FLOW_TUTORIAL.md)**

### 🚀 Início Rápido

```bash
# 1. Criar nova feature
git checkout develop
git pull origin develop
git checkout -b feature/<SeuNome>/issue#<NumDaIssue>

# 2. Desenvolver e commitar
git add .
git commit -m "feat: descrição da mudança"

# 3. Sincronizar e finalizar

# 4. Criar Pull Request no GitHub para a branch de Develop
```

### 📋 Convenções de Branch
- `main` - Código em produção
- `develop` - Integração de features
- `feature/<SeuNome>/issue#<NumDaIssue>` - Desenvolvimento de funcionalidades
- `hotfix/<SeuNome>/issue#<NumDaIssue>` - Correções urgentes, pode abrir PR direto na main
- `release/vX.Y.Z` - Preparação para release

### Convenções de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (não afeta lógica)
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Manutenção (deps, config, etc.)

### Padrões de Código
- **TypeScript** obrigatório
- **Biome** para linting e formatação
- **Testes** para novas funcionalidades
- **Documentação Swagger** atualizada

### Como Testar Localmente
```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env

# 3. Subir banco de dados
docker-compose up postgres -d

# 4. Executar migrations
npm run db:dev

# 5. Executar testes
npm test

# 6. Iniciar desenvolvimento
npm run start:dev
```

### Como Desenvolver uma Feature
1. **Leia o tutorial**: [GIT_FLOW_TUTORIAL.md](./GIT_FLOW_TUTORIAL.md)
2. **Crie uma branch**: `git checkout -b feature/sua-feature`
3. **Desenvolva seguindo os padrões** do projeto
4. **Execute testes**: `npm test`
5. **Atualize documentação** se necessário
6. **Crie Pull Request** no GitHub

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
