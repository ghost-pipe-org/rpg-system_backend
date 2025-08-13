# 🎲 RPG System Backend API

> Uma API REST completa para sistema de inscrições de mesas de RPG, desenvolvida em Node.js com TypeScript.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Tests](https://img.shields.io/badge/Tests-53%20passing-brightgreen)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Testes](#testes)
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

## 🎮 Funcionalidades

### 👤 Gestão de Usuários
- ✅ Registro de novos usuários
- ✅ Autenticação com email/senha
- ✅ Sistema de roles (PLAYER, MASTER, ADMIN)
- ✅ Perfis de usuário personalizados

### 🎲 Gestão de Sessões
- ✅ Criação de sessões por Mestres
- ✅ Sistema de datas possíveis
- ✅ Configuração de número de jogadores
- ✅ Status de sessões (PENDENTE, APROVADA, REJEITADA, CANCELADA)

### 📝 Sistema de Inscrições
- ✅ Inscrição de jogadores em sessões
- ✅ Controle de vagas disponíveis
- ✅ Prevenção de múltiplas inscrições

### 🛡️ Administração
- ✅ Aprovação/rejeição de sessões
- ✅ Visualização de todas as sessões
- ✅ Gestão completa do sistema

## 📦 Instalação

### Pré-requisitos
- Node.js 18 ou superior
- PostgreSQL 15 ou superior
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

### 🔐 Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/users` | Registrar novo usuário | ❌ |
| `POST` | `/users/authenticate` | Login de usuário | ❌ |

#### Exemplo de Registro
```bash
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "enrollment": "202301001"
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
  "title": "A Maldição de Strahd",
  "description": "Uma aventura épica em Ravenloft",
  "system": "D&D 5e",
  "requirements": "Personagens nível 1-3",
  "possibleDates": ["2025-08-20T19:00:00Z", "2025-08-21T19:00:00Z"],
  "period": "NOITE",
  "minPlayers": 3,
  "maxPlayers": 5,
  "location": "Sala 101"
}
```

### 👤 Perfil do Usuário

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/my-emmitted-sessions` | Sessões criadas pelo usuário | ✅ |
| `GET` | `/my-enrolled-sessions` | Sessões inscritas pelo usuário | ✅ |

## 🧪 Testes

O projeto possui **53 testes automatizados** cobrindo todos os endpoints e cenários.

### Executar testes
```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm run test:watch

# Executar com UI
npm run test:ui

# Executar apenas uma vez
npm run test:run

# Gerar relatório de cobertura
npm run test:coverage
```

### Estrutura de Testes
```
src/test/
├── controllers/
│   ├── health.test.ts           # 1 teste
│   ├── sessions-admin.test.ts   # 15 testes
│   ├── sessions-protected.test.ts # 14 testes
│   ├── sessions-public.test.ts  # 6 testes
│   ├── users-protected.test.ts  # 8 testes
│   └── users.test.ts           # 9 testes
└── setup/
    └── global-setup.ts
```

## 📂 Estrutura do Projeto

```
.
├── prisma/                 # Database schema e migrations
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── @types/            # Definições de tipos TypeScript
│   ├── controllers/       # Controllers da API
│   │   ├── middlewares/   # Middlewares de validação
│   │   ├── sessions/      # Endpoints de sessões
│   │   └── users/         # Endpoints de usuários
│   ├── env/               # Configuração de environment
│   ├── lib/               # Bibliotecas e utilitários
│   ├── repositories/      # Camada de dados
│   ├── services/          # Lógica de negócio
│   └── test/              # Testes automatizados
├── .github/workflows/     # CI/CD Pipeline
├── docker-compose.yml     # Docker setup
├── package.json
└── README.md
```

## 🔄 CI/CD

O projeto utiliza **GitHub Actions** para CI/CD automatizado:

- ✅ **Linting** com Biome
- ✅ **Type checking** com TypeScript
- ✅ **Testes automatizados** com Vitest
- ✅ **Database migrations** com Prisma
- ✅ **Build validation**

## 🐳 Docker

### Desenvolvimento com Docker
```bash
# Subir apenas o banco de dados
docker compose up postgres

# Subir ambiente completo
docker compose up --build
```

### Testes com Docker
```bash
docker-compose -f docker-compose.test.yml up
```

### Convenções de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
