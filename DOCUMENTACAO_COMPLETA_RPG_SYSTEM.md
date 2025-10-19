# 📚 Documentação Completa - RPG System Backend API

> **Versão:** 0.5.0  
> **Data:** Janeiro 2025  
> **Tecnologias:** Node.js, TypeScript, Express, Prisma, PostgreSQL, JWT

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Entidades do Banco de Dados](#entidades-do-banco-de-dados)
4. [Endpoints da API](#endpoints-da-api)
5. [Fluxos de Negócio](#fluxos-de-negócio)
6. [Sistema de Autenticação](#sistema-de-autenticação)
7. [Validações e Middlewares](#validações-e-middlewares)
8. [Estrutura de Arquivos](#estrutura-de-arquivos)
9. [Configuração e Deploy](#configuração-e-deploy)

---

## 🎯 Visão Geral

O **RPG System Backend** é uma API REST completa para gerenciamento de inscrições em mesas de RPG. O sistema permite que mestres criem sessões, jogadores se inscrevam e administradores gerenciem todo o processo de aprovação.

### Principais Funcionalidades:
- 🔐 **Sistema de Autenticação JWT** com 3 tipos de usuário (Player, Master, Admin)
- 🎮 **Gestão de Sessões RPG** com múltiplas datas possíveis
- 📝 **Sistema de Inscrições** automatizado com controle de vagas
- 🛡️ **Validação Robusta** com Zod e middlewares personalizados
- 📚 **Documentação Swagger** interativa
- 🧪 **53 Testes Automatizados** com cobertura completa

---

## 🏗️ Arquitetura do Sistema

### Padrão Arquitetural: **Clean Architecture**

```
┌─────────────────┐
│   Controllers   │ ← Recebem requisições HTTP
├─────────────────┤
│   Services      │ ← Lógica de negócio
├─────────────────┤
│  Repositories   │ ← Acesso aos dados
├─────────────────┤
│   Database      │ ← PostgreSQL + Prisma
└─────────────────┘
```

### Camadas:

1. **Controllers**: Recebem requisições HTTP, validam dados, chamam services
2. **Services**: Contêm lógica de negócio, regras de domínio e orquestração
3. **Repositories**: Abstraem acesso aos dados (Prisma + In-Memory para testes)
4. **Middlewares**: Validação, autenticação, autorização e tratamento de erros

---

## 🗄️ Entidades do Banco de Dados

### 1. **User** (Usuário)

```typescript
model User {
  id            String   @id @default(uuid()) @db.Uuid
  name          String   @db.VarChar(100)           // Nome completo
  enrollment    String?  @db.VarChar(9)            // Matrícula (obrigatória para MASTER)
  phoneNumber   String?  @db.VarChar(20)           // Telefone opcional
  email         String   @unique @db.VarChar(255)  // Email único
  passwordHash  String   @db.VarChar(255)           // Senha criptografada
  role          UserRole @default(PLAYER)          // PLAYER, MASTER, ADMIN
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relacionamentos
  enrollments     SessionEnrollment[]              // Inscrições do usuário
  createdSessions Session[] @relation("SessionToUser") // Sessões criadas
}
```

**Enums Relacionados:**
```typescript
enum UserRole {
  PLAYER  // Jogador comum
  MASTER  // Mestre de RPG
  ADMIN   // Administrador do sistema
}
```

### 2. **Session** (Sessão RPG)

```typescript
model Session {
  id            String         @id @default(uuid()) @db.Uuid
  title         String         @db.VarChar(255)      // Título da sessão
  description   String         @db.Text              // Descrição detalhada
  requirements  String?        @db.Text              // Requisitos opcionais
  status        SessionStatus  @default(PENDENTE)    // Status da sessão
  system        String         @db.VarChar(100)      // Sistema RPG (D&D, etc.)
  location      String?        @db.VarChar(255)      // Local da sessão
  approvedDate  DateTime?                            // Data aprovada pelo admin
  cancelEvent   String?        @db.Text              // Motivo do cancelamento
  period        SessionPeriod?                      // Período do dia
  minPlayers    Int                                  // Mínimo de jogadores
  maxPlayers    Int                                  // Máximo de jogadores

  // Relacionamentos
  enrollments   SessionEnrollment[]                 // Inscrições na sessão
  possibleDates SessionPossibleDate[]               // Datas possíveis
  masterId      String @db.Uuid                     // ID do mestre criador
  master        User   @relation(fields: [masterId], references: [id])

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**Enums Relacionados:**
```typescript
enum SessionStatus {
  CANCELADA  // Sessão cancelada
  REJEITADA  // Sessão rejeitada pelo admin
  APROVADA   // Sessão aprovada pelo admin
  PENDENTE   // Aguardando aprovação
}

enum SessionPeriod {
  MANHA   // Período da manhã
  TARDE   // Período da tarde
  NOITE   // Período da noite
}
```

### 3. **SessionPossibleDate** (Datas Possíveis)

```typescript
model SessionPossibleDate {
  id        String   @id @default(uuid()) @db.Uuid
  sessionId String   @db.Uuid                      // ID da sessão
  date      DateTime                               // Data/hora específica

  session   Session  @relation(fields: [sessionId], references: [id])
}
```

### 4. **SessionEnrollment** (Inscrição)

```typescript
model SessionEnrollment {
  id        String           @id @default(uuid()) @db.Uuid
  userId    String           @db.Uuid                      // ID do usuário
  sessionId String           @db.Uuid                      // ID da sessão
  status    EnrollmentStatus @default(PENDENTE)             // Status da inscrição

  user      User     @relation(fields: [userId], references: [id])
  session   Session  @relation(fields: [sessionId], references: [id])

  createdAt DateTime @default(now())

  @@unique([userId, sessionId])  // Usuário só pode se inscrever uma vez por sessão
}
```

**Enums Relacionados:**
```typescript
enum EnrollmentStatus {
  PENDENTE  // Inscrição pendente
  APROVADO  // Inscrição aprovada
  REJEITADO // Inscrição rejeitada
}
```

---

## 🌐 Endpoints da API

### **Base URL:** `http://localhost:3001`

### 🔓 **Endpoints Públicos**

#### 1. **Health Check**
```http
GET /
```
**Resposta:** `200 OK` - "API Node.js"

#### 2. **Registrar Usuário**
```http
POST /users
```
**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "Senha123",
  "enrollment": "123456789",     // Obrigatório se masterConfirm=true
  "phoneNumber": "(11) 99999-9999",
  "masterConfirm": false        // true = MASTER, false = PLAYER
}
```
**Respostas:**
- `201 Created` - Usuário criado
- `400 Bad Request` - Dados inválidos
- `409 Conflict` - Email já existe

#### 3. **Autenticar Usuário**
```http
POST /users/authenticate
```
**Body:**
```json
{
  "email": "joao@exemplo.com",
  "password": "Senha123"
}
```
**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "PLAYER"
  }
}
```

#### 4. **Listar Sessões Aprovadas**
```http
GET /sessions/approved
```
**Resposta:** `200 OK` - Array de sessões com status APROVADA

---

### 🔒 **Endpoints Protegidos (Requer JWT)**

#### 5. **Minhas Sessões Criadas**
```http
GET /my-emmitted-sessions
Authorization: Bearer <token>
```
**Resposta:** `200 OK` - Array de sessões criadas pelo usuário

#### 6. **Minhas Inscrições**
```http
GET /my-enrolled-sessions
Authorization: Bearer <token>
```
**Resposta:** `200 OK` - Array de sessões nas quais o usuário está inscrito

#### 7. **Criar Sessão** (Apenas MASTER)
```http
POST /sessions
Authorization: Bearer <token>
```
**Body:**
```json
{
  "title": "Campanha de D&D: A Maldição de Strahd",
  "description": "Uma aventura gótica de horror em Barovia",
  "requirements": "Conhecimento básico de D&D 5e",
  "system": "D&D 5e",
  "possibleDates": [
    "2024-12-31T20:00:00.000Z",
    "2025-01-07T20:00:00.000Z"
  ],
  "period": "NOITE",
  "minPlayers": 3,
  "maxPlayers": 6,
  "location": "Sala 101 - Prédio Principal"
}
```
**Respostas:**
- `201 Created` - Sessão criada (status PENDENTE)
- `400 Bad Request` - Dados inválidos ou mestre já tem sessão pendente
- `403 Forbidden` - Apenas mestres podem criar sessões

#### 8. **Inscrever-se em Sessão** (PLAYER/MASTER)
```http
POST /sessions/:sessionId/subscribe
Authorization: Bearer <token>
```
**Respostas:**
- `200 OK` - Inscrição realizada
- `400 Bad Request` - Sessão lotada ou usuário já inscrito
- `404 Not Found` - Sessão não encontrada

---

### 👑 **Endpoints Administrativos (Apenas ADMIN)**

#### 9. **Listar Todas as Sessões**
```http
GET /sessions
Authorization: Bearer <token>
```
**Resposta:** `200 OK` - Array com todas as sessões (todos os status)

#### 10. **Aprovar Sessão**
```http
PATCH /sessions/:sessionId/approve
Authorization: Bearer <token>
```
**Body:**
```json
{
  "approvedDate": "2024-12-31T20:00:00.000Z",
  "location": "Sala 101 - Prédio Principal"
}
```
**Respostas:**
- `200 OK` - Sessão aprovada
- `400 Bad Request` - Data não está entre as possíveis
- `404 Not Found` - Sessão não encontrada
- `409 Conflict` - Sessão já aprovada

#### 11. **Rejeitar Sessão**
```http
PATCH /sessions/:sessionId/reject
Authorization: Bearer <token>
```
**Respostas:**
- `200 OK` - Sessão rejeitada
- `404 Not Found` - Sessão não encontrada
- `409 Conflict` - Sessão já rejeitada

---

## 🔄 Fluxos de Negócio

### 1. **Fluxo de Registro de Usuário**

```mermaid
graph TD
    A[Usuário preenche formulário] --> B{masterConfirm?}
    B -->|true| C[Validação: enrollment obrigatório]
    B -->|false| D[Role = PLAYER]
    C --> E[Role = MASTER]
    D --> F[Hash da senha]
    E --> F
    F --> G[Verifica email único]
    G --> H[Salva no banco]
    H --> I[Retorna usuário criado]
```

### 2. **Fluxo de Autenticação**

```mermaid
graph TD
    A[Usuário envia credenciais] --> B[Validação com Zod]
    B --> C[Busca usuário por email]
    C --> D{Usuário existe?}
    D -->|Não| E[Erro: Credenciais inválidas]
    D -->|Sim| F[Compara senha com hash]
    F --> G{Senha correta?}
    G -->|Não| E
    G -->|Sim| H[Gera JWT token]
    H --> I[Retorna token + dados do usuário]
```

### 3. **Fluxo de Criação de Sessão**

```mermaid
graph TD
    A[Mestre cria sessão] --> B[Validação JWT + Role MASTER]
    B --> C[Validação dados com Zod]
    C --> D[Mestre já tem sessão pendente?]
    D -->|Sim| E[Erro: Sessão pendente existe]
    D -->|Não| F[Cria sessão com status PENDENTE]
    F --> G[Cria datas possíveis]
    G --> H[Retorna sessão criada]
```

### 4. **Fluxo de Aprovação de Sessão**

```mermaid
graph TD
    A[Admin aprova sessão] --> B[Validação JWT + Role ADMIN]
    B --> C[Sessão existe?]
    C -->|Não| D[Erro: Sessão não encontrada]
    C -->|Sim| E[Sessão já aprovada?]
    E -->|Sim| F[Erro: Sessão já aprovada]
    E -->|Não| G[Data aprovada está entre possíveis?]
    G -->|Não| H[Erro: Data inválida]
    G -->|Sim| I[Atualiza status para APROVADA]
    I --> J[Define data e local aprovados]
    J --> K[Retorna sessão atualizada]
```

### 5. **Fluxo de Inscrição em Sessão**

```mermaid
graph TD
    A[Jogador se inscreve] --> B[Validação JWT + Role PLAYER/MASTER]
    B --> C[Sessão existe?]
    C -->|Não| D[Erro: Sessão não encontrada]
    C -->|Sim| E[Usuário já inscrito?]
    E -->|Sim| F[Erro: Já inscrito]
    E -->|Não| G[Sessão tem vagas?]
    G -->|Não| H[Erro: Sessão lotada]
    G -->|Sim| I[Cria inscrição com status PENDENTE]
    I --> J[Retorna sucesso]
```

---

## 🔐 Sistema de Autenticação

### **JWT (JSON Web Token)**

**Configuração:**
- **Algoritmo:** HS256
- **Secret:** Configurado via `JWT_SECRET` no `.env`
- **Payload:** `{ sub: userId }`

**Middleware de Validação:**
```typescript
export const validateJWT = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
      req.user = { id: decoded.sub };
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
```

### **Sistema de Roles**

**Hierarquia de Permissões:**
- **ADMIN:** Acesso total ao sistema
- **MASTER:** Pode criar sessões e se inscrever
- **PLAYER:** Pode apenas se inscrever

**Middleware de Validação de Role:**
```typescript
export const validateRole = (requiredRoles: UserRole | UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const user = await usersRepository.findById(userId);
    const userRole = user?.role;
    
    const allowedRoles = Array.isArray(requiredRoles) 
      ? requiredRoles 
      : [requiredRoles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
        required: allowedRoles,
        current: userRole,
      });
    }
    
    next();
  };
};
```

---

## 🛡️ Validações e Middlewares

### **Validação com Zod**

#### 1. **Registro de Usuário**
```typescript
const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  enrollment: z.string().regex(/^\d{9}$/).or(z.literal("")).optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  masterConfirm: z.boolean().optional(),
}).refine((data) => {
  if (data.masterConfirm === true) {
    return data.enrollment && data.enrollment.length === 9 && /^\d{9}$/.test(data.enrollment);
  }
  return true;
}, {
  message: "Para se registrar como mestre, é necessário fornecer uma matrícula válida de 9 dígitos",
  path: ["enrollment"],
});
```

#### 2. **Criação de Sessão**
```typescript
const emitSessionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  requirements: z.string().optional(),
  system: z.string().min(1, { message: "System is required" }),
  possibleDates: z.array(z.string().datetime()).min(1, { message: "At least one date is required" }),
  period: z.enum(["MANHA", "TARDE", "NOITE"]),
  minPlayers: z.number().int().min(1, { message: "Minimum players must be at least 1" }),
  maxPlayers: z.number().int().min(1, { message: "Maximum players must be at least 1" }),
});
```

### **Tratamento de Erros**

**Classes de Erro Personalizadas:**
- `UserAlreadyExistsError` - Email já cadastrado
- `InvalidCredentialsError` - Credenciais inválidas
- `MasterRequiresEnrollmentError` - Mestre sem matrícula
- `PendingSessionExistsError` - Mestre já tem sessão pendente
- `SessionFullError` - Sessão sem vagas
- `AlreadyEnrolledError` - Usuário já inscrito
- `SessionAlreadyApprovedError` - Sessão já aprovada
- `SessionAlreadyRejectedError` - Sessão já rejeitada

---

## 📁 Estrutura de Arquivos

```
src/
├── @types/
│   └── express.d.ts              # Extensão de tipos do Express
├── app.ts                        # Configuração principal da aplicação
├── controllers/                   # Camada de controle
│   ├── index.ts                  # Roteamento principal
│   ├── middlewares/              # Middlewares de validação
│   │   ├── validateJWT.ts        # Validação de token JWT
│   │   ├── validateRole.ts       # Validação de permissões
│   │   ├── validateRegister.ts   # Validação de registro
│   │   ├── validateAuthenticate.ts # Validação de login
│   │   ├── validateEmitSession.ts # Validação de criação de sessão
│   │   └── validateApproveSession.ts # Validação de aprovação
│   ├── sessions/                 # Controllers de sessões
│   │   ├── sessionsRoutes.ts     # Rotas de sessões
│   │   ├── emitSessionController.ts
│   │   ├── approveSessionController.ts
│   │   ├── rejectSessionController.ts
│   │   ├── getAllSessionsController.ts
│   │   ├── getAvaliableSessionsController.ts
│   │   └── subscribeUserToSessionController.ts
│   └── users/                    # Controllers de usuários
│       ├── usersRoutes.ts        # Rotas de usuários
│       ├── registerController.ts
│       ├── authenticateController.ts
│       ├── getEmittedSessionsController.ts
│       └── getEnrolledSessionsController.ts
├── services/                     # Camada de serviços (lógica de negócio)
│   ├── errors/                   # Classes de erro personalizadas
│   ├── factories/                # Factory functions para services
│   ├── sessions/                 # Services de sessões
│   └── users/                    # Services de usuários
├── repositories/                 # Camada de dados
│   ├── in-memory/                # Implementação em memória (testes)
│   ├── prisma/                   # Implementação com Prisma
│   ├── sessionsRepository.ts     # Interface do repositório de sessões
│   └── usersRepository.ts        # Interface do repositório de usuários
├── swagger/                      # Documentação da API
│   ├── index.ts                  # Setup do Swagger
│   ├── swaggerConfig.ts          # Configuração do Swagger
│   └── swaggerPaths.ts          # Definição dos endpoints
├── lib/                          # Utilitários
│   └── prisma.ts                # Cliente Prisma
├── env/                          # Configuração de ambiente
│   └── index.ts                  # Validação de variáveis de ambiente
└── test/                         # Testes automatizados
    ├── controllers/              # Testes de controllers
    ├── helpers.ts                # Utilitários para testes
    └── setup.ts                  # Configuração dos testes

prisma/
├── schema.prisma                 # Schema do banco de dados
├── migrations/                   # Migrations do Prisma
└── seed.ts                      # Dados iniciais (usuário admin)

docs/
└── GIT_FLOW_TUTORIAL.md         # Tutorial de Git Flow
```

---

## ⚙️ Configuração e Deploy

### **Variáveis de Ambiente**

```env
# .env
DATABASE_URL="postgres://postgres:1234@postgres:5432/rpg-system-backend"
JWT_SECRET="seu-jwt-secret-super-seguro"
PORT=3001
NODE_ENV=development
```

### **Scripts Disponíveis**

```json
{
  "start": "tsx server.ts",                    // Produção
  "start:dev": "tsx watch server.ts",          // Desenvolvimento com hot-reload
  "db:dev": "prisma migrate dev",              // Executar migrations
  "db:seed": "tsx prisma/seed.ts",             // Popular banco com dados iniciais
  "test": "vitest",                            // Executar testes
  "test:docker": "docker compose -f docker-compose.test.yml up -d && npx wait-port localhost:5433 && cross-env DATABASE_URL=postgresql://test:1234@localhost:5433/test npx prisma migrate deploy && cross-env DATABASE_URL=postgresql://test:1234@localhost:5433/test npm run test:run && docker compose -f docker-compose.test.yml down -v"
}
```

### **Docker**

**Desenvolvimento:**
```bash
docker-compose up --build
```

**Testes:**
```bash
npm run test:docker
```

### **Documentação Swagger**

**Acesso:** `http://localhost:3001/api-docs`

**Como usar:**
1. Acesse a interface web
2. Para endpoints protegidos: faça login em `/users/authenticate`
3. Copie o token JWT retornado
4. Clique em "Authorize" e cole o token
5. Teste os endpoints diretamente na interface

---

## 🧪 Testes

### **Cobertura de Testes: 53 Testes Automatizados**

**Cenários Testados:**
- ✅ **Autenticação**: Registro, login, JWT validation
- ✅ **Sessões**: CRUD, aprovação, inscrições, validações
- ✅ **Autorização**: Middlewares, roles, permissões
- ✅ **Validações**: Schemas, business rules, edge cases
- ✅ **Cenários de Erro**: 400, 401, 403, 404, 409

**Comandos de Teste:**
```bash
npm run test:docker          # Completo: banco + migrations + testes + cleanup
npm run test:docker:watch    # Modo watch com Docker
npm run test:docker:coverage # Com relatório de cobertura
npm run test:db:start        # Apenas inicia banco de testes
npm run test:db:stop         # Para banco de testes
```

---

## 🔧 Tecnologias Utilizadas

### **Core Stack**
- **Node.js 18+** & **TypeScript 5.0+** - Runtime e tipagem
- **Express.js** - Framework web minimalista
- **PostgreSQL** + **Prisma ORM** - Banco de dados e migrations
- **JWT** + **bcryptjs** - Autenticação e segurança

### **Documentação & Testes**
- **Swagger/OpenAPI 3.0** - Documentação interativa da API
- **Vitest** + **Supertest** - Framework de testes e HTTP testing
- **Zod** - Validação de schemas e dados

### **DevOps & Desenvolvimento**
- **Docker** - Containerização para desenvolvimento e produção
- **Biome** - Linting, formatação e análise de código
- **TSX** - Execução TypeScript com hot-reload

---

## 📊 Métricas do Projeto

- **Linhas de Código:** ~3.000 linhas
- **Testes:** 53 testes automatizados
- **Endpoints:** 11 endpoints REST
- **Entidades:** 4 entidades principais
- **Cobertura:** 100% dos cenários críticos
- **Documentação:** Swagger completo e interativo

---

## 🚀 Próximos Passos Sugeridos

1. **Implementar notificações** por email quando sessões são aprovadas/rejeitadas
2. **Adicionar sistema de avaliações** de sessões pelos jogadores
3. **Implementar chat** em tempo real para comunicação durante as sessões
4. **Adicionar sistema de badges** para mestres e jogadores
5. **Implementar dashboard** administrativo com métricas
6. **Adicionar sistema de backup** automático do banco de dados

---

**Documentação gerada automaticamente em Janeiro 2025**  
**Versão da API: 0.5.0**
