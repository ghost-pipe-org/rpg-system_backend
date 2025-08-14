# 🌳 Git Flow - Tutorial para Desenvolvimento de Features

> Guia completo para desenvolvimento de features seguindo os padrões Git Flow no projeto RPG System API

## 📋 Índice

- [Sobre Git Flow](#sobre-git-flow)
- [Estrutura de Branches](#estrutura-de-branches)
- [Configuração Inicial](#configuração-inicial)
- [Criando uma Feature](#criando-uma-feature)
- [Desenvolvimento da Feature](#desenvolvimento-da-feature)
- [Finalizando a Feature](#finalizando-a-feature)
- [Exemplo Prático](#exemplo-prático)
- [Convenções do Projeto](#convenções-do-projeto)
- [Troubleshooting](#troubleshooting)

## 🎯 Sobre Git Flow

O **Git Flow** é um modelo de branching que define um conjunto de regras para organizar branches de forma consistente e escalável. Ele é ideal para projetos com releases planejados e múltiplos desenvolvedores.

## 🌿 Estrutura de Branches

```
main (produção)
└── develop (desenvolvimento)
    ├── feature/nova-funcionalidade
    ├── feature/correcao-bug
    └── release/v1.2.0
```

### 📌 Tipos de Branches:

| Branch | Propósito | Origem | Destino |
|--------|-----------|---------|---------|
| `main` | Código em produção | - | `hotfix/*` |
| `develop` | Integração de features | `main` | `release/*`, `feature/*` |
| `feature/*` | Desenvolvimento de funcionalidades | `develop` | `develop` |
| `release/*` | Preparação para release | `develop` | `main` + `develop` |
| `hotfix/*` | Correções urgentes | `main` | `main` + `develop` |

## 🛠️ Configuração Inicial

### 1. Clone do Repositório
```bash
# Clone o projeto
git clone https://github.com/ghost-pipe-org/api-test.git
cd api-test

# Verificar branches disponíveis
git branch -a
```


### 2. Configurar Ambiente de Desenvolvimento
```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Subir banco de dados
docker-compose up postgres -d

# Executar migrations
npm run db:dev
```

## 🚀 Criando uma Feature

### 1. Começar Nova Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<SeuNome>/issue#<NumDaIssue>
```

### 2. Verificar Branch Ativa
```bash
# Verificar branch atual
git branch

# Deve mostrar:
# develop
# * feature/nome-da-feature
```

## 💻 Desenvolvimento da Feature

### 1. Fluxo de Trabalho

```bash
# 1. Fazer alterações no código
# ... desenvolver a feature ...

# 2. Verificar status
git status

# 3. Adicionar arquivos
git add .

# 4. Commit com mensagem clara
git commit -m "feat: adicionar upload de fotos do perfil"

# 5. Push para origem (primeira vez)
git push -u origin feature/<SeuNome>/issue#<NumDaIssue>

# 6. Push subsequentes
git push
```

### 2. Sincronizar com Develop

```bash
# Atualizar develop local
git checkout develop
git pull origin develop

# Voltar para a feature
git checkout feature/<SeuNome>/issue#<NumDaIssue>

# Fazer rebase (recomendado)
git rebase develop

# Ou merge (alternativa)
git merge develop
```

### 3. Commits Frequentes

Faça commits **pequenos e frequentes**:

```bash
# Exemplos de commits granulares
git commit -m "feat: criar schema do banco para fotos"
git commit -m "feat: implementar upload de arquivo"
git commit -m "feat: adicionar validação de imagem"
git commit -m "test: adicionar testes de upload"
git commit -m "docs: atualizar swagger com endpoint de foto"
```

### 4. Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes específicos
npm test -- user-profile

# Verificar cobertura
npm run test:coverage

# Executar linting
npm run lint
```

## ✅ Finalizando a Feature

### 1. Preparação Final

```bash
# 1. Atualizar com develop
git checkout develop
git pull origin develop
git checkout feature/<SeuNome>/issue#<NumDaIssue>
git rebase develop

# 2. Executar testes completos
npm test

# 3. Verificar build
npm run build

# 4. Verificar linting
npm run lint
```

### 2. Finalizar Feature

```bash
# Método 1: Com git-flow
git flow feature finish nome-da-feature
# Método 2: Manual
git checkout develop
git merge --no-ff feature/nome-da-feature
git branch -d feature/nome-da-feature
git push origin develop
```

### 3. Criar Pull Request

1. **Acesse o GitHub**
2. **Compare**: `feature/nome-da-feature` → `develop`
3. **Título**: Use convenção de commit (`feat: adicionar upload de fotos`)
4. **Descrição**: Template padrão

```markdown
## 📝 Descrição
Breve descrição da feature implementada.

## 🔧 Mudanças
- [ ] Nova funcionalidade X
- [ ] Correção Y
- [ ] Atualização Z

## 🧪 Testes
- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Cobertura mantida/aumentada

## 📚 Documentação
- [ ] Swagger atualizado
- [ ] README atualizado (se necessário)

## 🔗 Issues Relacionadas
Closes #123
```

## 🎯 Exemplo Prático

Vamos criar uma feature para **sistema de notificações por email**:

### 1. Iniciar Feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/email-notifications
```

### 2. Implementar Feature

**2.1. Criar Service:**
```bash
# Criar arquivo
touch src/services/notifications/emailService.ts

# Implementar lógica
# ... código ...

git add src/services/notifications/emailService.ts
git commit -m "feat: criar serviço base de email"
```

**2.2. Adicionar Dependências:**
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer

git add package.json package-lock.json
git commit -m "feat: adicionar dependência nodemailer"
```

**2.3. Criar Controller:**
```bash
# Implementar endpoint
# ... código ...

git add src/controllers/notifications/
git commit -m "feat: adicionar endpoint de notificações"
```

**2.4. Adicionar Testes:**
```bash
# Implementar testes
# ... código ...

npm test

git add src/test/controllers/notifications.test.ts
git commit -m "test: adicionar testes de notificação"
```

**2.5. Atualizar Documentação:**
```bash
# Atualizar Swagger
# ... código ...

git add src/swagger/
git commit -m "docs: adicionar endpoints de notificação ao swagger"
```

### 3. Sincronizar e Finalizar
```bash
# Sincronizar com develop
git checkout develop
git pull origin develop
git checkout feature/email-notifications
git rebase develop

# Verificar tudo funcionando
npm test
npm run build

# Push final
git push -u origin feature/email-notifications
```

### 4. Pull Request
- Criar PR no GitHub
- Aguardar review
- Fazer ajustes se necessário
- Merge após aprovação

## 📋 Convenções do Projeto

### 🏷️ Convenções de Commit

Use o padrão **Conventional Commits**:

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: adicionar sistema de chat` |
| `fix` | Correção de bug | `fix: corrigir validação de email` |
| `docs` | Documentação | `docs: atualizar API endpoints` |
| `style` | Formatação | `style: aplicar formatação biome` |
| `refactor` | Refatoração | `refactor: extrair lógica de validação` |
| `test` | Testes | `test: adicionar testes de integração` |
| `chore` | Manutenção | `chore: atualizar dependências` |

### 📁 Estrutura de Arquivos

Siga a organização existente:

```
src/
├── controllers/           # Endpoints da API
│   ├── middlewares/      # Validações e auth
│   └── notifications/    # Nova feature
├── services/             # Lógica de negócio
│   └── notifications/    # Serviços da feature
├── repositories/         # Acesso a dados
├── test/                 # Testes
│   └── controllers/
└── swagger/              # Documentação
```

### 🧪 Padrões de Teste

```bash
# Nomear arquivos de teste
nome-do-arquivo.test.ts

# Estrutura de teste
describe('Feature Name', () => {
  describe('POST /endpoint', () => {
    it('should create resource successfully', () => {
      // teste
    })
    
    it('should return 400 for invalid data', () => {
      // teste
    })
  })
})
```

### 📚 Documentação Swagger

```typescript
// Adicionar ao swaggerPaths.ts
'/notifications': {
  post: {
    tags: ['Notificações'],
    summary: 'Enviar notificação',
    // ... resto da documentação
  }
}
```

## 🚨 Troubleshooting

### Problemas Comuns

**❌ Erro: Branch não atualizada**
```bash
# Problema: Conflitos com develop
# Solução:
git checkout develop
git pull origin develop
git checkout feature/sua-feature
git rebase develop
# Resolver conflitos manualmente
git add .
git rebase --continue
```

**❌ Erro: Testes falhando**
```bash
# Problema: Testes quebrados
# Solução:
npm test -- --reporter=verbose
# Verificar erros específicos
# Corrigir e commitar
git add .
git commit -m "fix: corrigir testes quebrados"
```

**❌ Erro: Build falhando**
```bash
# Problema: Erro de TypeScript
# Solução:
npm run build
# Verificar erros de tipo
# Corrigir e testar novamente
```

**❌ Erro: Branch divergiu**
```bash
# Problema: Branch local diferente do remoto
# Solução:
git fetch origin
git reset --hard origin/feature/sua-feature
# OU fazer rebase interativo
git rebase -i HEAD~n
```

### Comandos de Emergência

```bash
# Desfazer último commit (mantendo mudanças)
git reset --soft HEAD~1

# Desfazer mudanças não commitadas
git checkout .

# Limpar arquivos não rastreados
git clean -fd

# Ver histórico detalhado
git log --graph --oneline --all

# Encontrar commit específico
git log --grep="mensagem"
```

## 🎯 Checklist da Feature

Antes de finalizar uma feature, verifique:

### ✅ Código
- [ ] Feature implementada completamente
- [ ] Código revisado e limpo
- [ ] Sem TODOs ou FIXMEs pendentes
- [ ] Variáveis e funções bem nomeadas

### ✅ Testes
- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Cobertura de código mantida (>80%)
- [ ] Casos edge testados

### ✅ Qualidade
- [ ] Linting passando (`npm run lint`)
- [ ] Build funcionando (`npm run build`)
- [ ] Sem warnings no console
- [ ] Performance adequada

### ✅ Documentação
- [ ] Swagger atualizado
- [ ] README atualizado (se necessário)
- [ ] Comentários no código (quando necessário)
- [ ] Variáveis de ambiente documentadas

### ✅ Git
- [ ] Commits com mensagens claras
- [ ] Branch sincronizada com develop
- [ ] Conflitos resolvidos
- [ ] Push realizado

---

## 🎉 Conclusão

Seguindo este guia, você terá um fluxo de desenvolvimento **organizado**, **colaborativo** e **profissional**. O Git Flow garante que:

- ✅ **Código principal** sempre estável
- ✅ **Features** desenvolvidas isoladamente
- ✅ **Histórico** limpo e rastreável
- ✅ **Colaboração** eficiente em equipe

Para dúvidas, consulte a [documentação oficial do Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) ou abra uma issue no projeto.

**Happy coding! 🚀**
