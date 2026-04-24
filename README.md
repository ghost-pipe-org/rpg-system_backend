# 🎲 RPG System Backend API

> Uma API REST completa para sistema de inscrições de mesas de RPG, desenvolvida em Node.js com TypeScript.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-brightgreen)
![Tests](https://img.shields.io/badge/Tests-123%20passing-brightgreen)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Início Rápido](#início-rápido)
- [Documentação da API](#documentação-da-api)
- [Instalação](#instalação)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Git Flow](#git-flow)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O **RPG System Backend** é uma API REST que gerencia um sistema completo de inscrições para mesas de RPG e Oficinas. Permite que mestres criem sessões, organizem oficinas, jogadores se inscrevam, e administradores gerenciem todo o sistema.

### ✨ Principais Características

- 🔐 **Autenticação JWT** com sistema de roles (Player, Master, Admin)
- 🎮 **Gestão de Sessões** com múltiplas datas possíveis e controle de vagas
- 📝 **Sistema de Inscrições** automatizado com aprovação/rejeição
- 🛡️ **Validação Robusta** com Zod e middlewares personalizados
- 📚 **Documentação Swagger** interativa e sempre atualizada
- 🐳 **Docker** para desenvolvimento e produção
- 🧪 **123 Testes Automatizados** com cobertura completa
- 📊 **PostgreSQL + Prisma ORM** para persistência de dados

## 🚀 Tecnologias

### Core Stack
- **Node.js 18+** & **TypeScript 5.0+** - Runtime e tipagem
- **Express.js** - Framework web minimalista
- **PostgreSQL** + **Prisma ORM** - Banco de dados e migrations
- **JWT** + **bcryptjs** - Autenticação e segurança

### Documentação & Testes
- **Swagger/OpenAPI 3.0** - Documentação interativa da API
- **Vitest** + **Supertest** - Framework de testes e HTTP testing
- **Zod** - Validação de schemas e dados

### DevOps & Desenvolvimento
- **Docker** - Containerização para desenvolvimento e produção
- **Biome** - Linting, formatação e análise de código
- **TSX** - Execução TypeScript com hot-reload

## ⚡ Início Rápido

### 🐳 Com Docker (Recomendado)

```bash
# Clone e execute tudo automaticamente
git clone https://github.com/ghost-pipe-org/rpg-system_backend.git
cd rpg-system_backend

# Configure ambiente
cp .env.example .env

npm intall
docker-compose up --build

# Acesse:
# API: http://localhost:3001
# Documentação: http://localhost:3001/api-docs
```

### 💻 Desenvolvimento Local

```bash
# 1. Clone e instale
git clone https://github.com/ghost-pipe-org/rpg-system_backend.git
cd rpg-system_backend
npm install

# 2. Configure ambiente
cp .env.example .env

# 3. Inicie banco e aplicação
docker-compose up postgres -d
npm run db:dev #(Migrations do BD)
npm run start:dev

# 4. Execute testes
npm run test:docker
```

## 📚 Documentação da API

A API possui **documentação Swagger interativa** completa:

- **🌐 Interface**: `http://localhost:3001/api-docs`
- **📄 Schema JSON**: `http://localhost:3001/api-docs.json`

### Como Usar a Documentação:
1. Acesse a interface web
2. Para endpoints protegidos: faça login em `/users/authenticate` 
3. Copie o token JWT retornado
4. Clique em "Authorize" e cole o token
5. Teste os endpoints diretamente na interface

### Principais Endpoints:

| Grupo | Endpoint | Descrição | Auth |
|-------|----------|-----------|------|
| **Auth** | `POST /users` | Registrar usuário | ❌ |
| | `POST /users/authenticate` | Login | ❌ |
| **Sessions** | `GET /sessions/approved` | Sessões aprovadas | ❌ |
| | `GET /sessions` | Todas as sessões | 🔒 Admin |
| | `POST /sessions` | Criar sessão | 🔒 Master |
| | `POST /sessions/:id/subscribe` | Inscrever-se em sessão | 🔒 Player/Master |
| | `PATCH /sessions/:id/approve` | Aprovar sessão | 🔒 Admin |
| | `PATCH /sessions/:id/reject` | Rejeitar sessão | 🔒 Admin |
| | `DELETE /sessions/:id` | Cancelar sessão pendente | 🔒 Master |
| **Workshops** | `GET /workshops/approved` | Oficinas aprovadas | ❌ |
| | `GET /workshops` | Todas as oficinas | 🔒 Admin |
| | `POST /workshops` | Emitir oficina | 🔒 Master |
| | `POST /workshops/:id/subscribe` | Inscrever-se em oficina | 🔒 Player/Master |
| **Profile** | `GET /my-emmitted-sessions` | Minhas sessões criadas | 🔒 |
| | `GET /my-enrolled-sessions` | Minhas inscrições | 🔒 |
| | `GET /users/profile` | Meu perfil completo | 🔒 |
| | `PATCH /users/profile` | Atualizar perfil | 🔒 |

> 📖 **Documentação Completa**: Todas as rotas, schemas e exemplos estão disponíveis na interface Swagger.

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 15+ (ou Docker)

### Configuração

1. **Clone e instale dependências**
```bash
git clone https://github.com/ghost-pipe-org/rpg-system_backend.git
cd rpg-system_backend
npm install
```

2. **Configure variáveis de ambiente**
```bash
cp .env.example .env
```

```env
# .env
DATABASE_URL="postgres://postgres:1234@postgres:5432/rpg-system-backend"
JWT_SECRET="seu-jwt-secret-super-seguro"
PORT=3001
NODE_ENV=development
```

3. **Configure banco de dados**
```bash
# Com Docker
docker-compose up postgres -d

# Execute migrations
npm run db:dev

# (Opcional) Execute seed (Popula o banco com Admin)
npm run db:seed
```

4. **Inicie a aplicação**
```bash
# Desenvolvimento (hot-reload)
npm run start:dev

# Produção
npm run build
npm start
```

### 🐳 Docker Commands

```bash
# Ambiente completo
docker-compose up --build

# Apenas banco de dados
docker-compose up postgres -d

# Ver logs
docker-compose logs -f

# Parar e limpar
docker-compose down -v
```

## 🧪 Testes

O projeto possui **123 testes automatizados** cobrindo todos os cenários:

### ⚡ Comandos Rápidos

```bash
# Execução automática completa (recomendado)
npm run test:docker

# Apenas iniciar banco de testes
npm run test:db:start

# Testes locais (com banco já rodando)  
npm test

# Parar banco de testes
npm run test:db:stop
```

### 📊 Cobertura de Testes

- ✅ **Autenticação**: Registro, login, JWT validation
- ✅ **Sessões**: CRUD, aprovação, inscrições, validações
- ✅ **Autorização**: Middlewares, roles, permissões
- ✅ **Validações**: Schemas, business rules, edge cases
- ✅ **Cenários de Erro**: 400, 401, 403, 404, 409

### 🔧 Scripts de Teste

```bash
npm run test:docker          # Completo: banco + migrations + testes + cleanup
npm run test:docker:watch    # Modo watch com Docker
npm run test:docker:coverage # Com relatório de cobertura
npm run test:db:start        # Apenas inicia banco de testes
npm run test:db:stop         # Para banco de testes
```

## 📂 Estrutura do Projeto

```
src/
├── controllers/         # Endpoints da API
│   ├── middlewares/     # Validações e autenticação
│   ├── sessions/        # Gestão de sessões de RPG
│   └── users/           # Autenticação e perfil
├── services/            # Lógica de negócio
├── repositories/        # Camada de dados (Prisma + In-Memory)
├── swagger/             # Documentação OpenAPI
├── lib/                 # Utilitários (Prisma client, etc.)
├── env/                 # Configuração de environment
└── test/                # Testes automatizados

prisma/
├── schema.prisma        # Schema do banco
├── migrations/          # Migrations do Prisma
└── seed.ts             # Dados iniciais

docs/
├── GIT_FLOW_TUTORIAL.md # Tutorial de desenvolvimento
```

### 🏗️ Arquitetura em Camadas

- **Controllers**: Recebem requisições HTTP, validam dados, chamam services
- **Services**: Contêm lógica de negócio, regras de domínio e orquestração
- **Repositories**: Abstraem acesso aos dados (Prisma + In-Memory para testes)
- **Middlewares**: Validação, autenticação, autorização e tratamento de erros

## 🌳 Git Flow

Este projeto segue **Git Flow** para organização e desenvolvimento:

### 📖 Tutorial Completo
**➡️ [GIT_FLOW_TUTORIAL.md](./GIT_FLOW_TUTORIAL.md)**

### 🚀 Desenvolvimento de Feature

```bash
# 1. Iniciar nova feature
git checkout develop
git pull origin develop
git checkout -b feature/<SeuNome>/issue#<numero>

# 2. Desenvolver seguindo os padrões
# - TypeScript obrigatório
# - Testes para novas funcionalidades  
# - Documentação Swagger atualizada
# - Linting com Biome

# 3. Testar localmente
npm run test:docker

# 4. Criar Pull Request para develop
```

### 📋 Convenções

**Branches:**
- `main` - Produção
- `develop` - Integração
- `feature/<name>/issue#<num>` - Novas funcionalidades
- `hotfix/<name>/issue#<num>` - Correções urgentes

**Commits:**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `test:` Testes
- `refactor:` Refatoração

## �📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
