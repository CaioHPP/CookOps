# 🍽️ CookOps Backend

Bem-vindo ao **CookOps**, o sistema inteligente de gerenciamento de pedidos para **dark kitchens** e **restaurantes modernos**, focado em performance, organização e visibilidade em tempo real da cozinha.  
Este repositório representa o **backend** da aplicação, desenvolvido em **NestJS + Prisma**, com foco em escalabilidade, segurança e boas práticas de arquitetura.

---

## 📌 Tecnologias Utilizadas

| Tecnologia            | Descrição                                                            |
| --------------------- | -------------------------------------------------------------------- |
| **NestJS**            | Framework principal do backend, baseado em arquitetura modular e OOP |
| **Prisma ORM**        | Acesso ao banco de dados com tipagem e geração automática de schemas |
| **PostgreSQL**        | Banco de dados utilizado                                             |
| **Socket.IO**         | Comunicação em tempo real entre cozinha e outras áreas via WebSocket |
| **JWT + Passport**    | Autenticação robusta com suporte a roles (`ADMIN`, `FUNCIONARIO`)    |
| **class-validator**   | Validação de DTOs com decorators intuitivos                          |
| **Swagger (OpenAPI)** | Documentação automática de todas as rotas da API                     |
| **Rate Limiting**     | Controle de requisições para evitar abusos (Throttler)               |
| **CORS Configurado**  | Permissão de acesso controlado para clientes autorizados             |
| **bcrypt**            | Criptografia de senhas no registro de usuários                       |

---

## 🚀 Funcionalidades do Backend

- ✅ **CRUD completo** de todas as entidades da aplicação
- 🔐 **Autenticação com JWT** e controle de permissões por tipo de usuário
- 📦 **Integração com WebSocket** para atualização em tempo real do status dos pedidos
- 📊 **Dashboard-ready** com endpoints prontos para relatórios e indicadores
- ⚙️ **Arquitetura modular com serviços, controladores e DTOs**
- 🔎 **Swagger disponível em `/api` para testes e documentação**
- 🧪 **Estrutura de testes (unitários e E2E) com Jest**
- 🌐 **CORS e Rate Limiting configurados** para segurança e controle
- 🧠 **Projeto estruturado para escalabilidade**, preparado para produção

---

## 🗂️ Estrutura do Projeto

```
src/
├── auth/              # Módulo de autenticação
├── common/            # Filtros, guards e decorators reutilizáveis
├── gateways/          # WebSockets organizados por namespace
├── modules/           # Módulos das entidades (pedido, produto, etc.)
├── prisma/            # PrismaService e configurações
└── main.ts            # Ponto de entrada da aplicação
```

---

## 🧰 Scripts Úteis

| Comando                 | Descrição                                 |
| ----------------------- | ----------------------------------------- |
| `npm run start:dev`     | Inicia o servidor em modo desenvolvimento |
| `npm run build`         | Compila o projeto para produção           |
| `npm run start:prod`    | Inicia a versão compilada                 |
| `npm run prisma:studio` | Abre o Prisma Studio                      |
| `npm run migrate:dev`   | Executa migrações com histórico           |
| `npm run prisma:seed`   | Roda o seed (povoamento inicial do banco) |
| `npm run format`        | Formata o código com Prettier             |
| `npm run lint`          | Corrige problemas de lint automaticamente |

---

## 📦 Instalação e Execução

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/cookops-backend.git
cd cookops-backend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o banco de dados**
   Crie um arquivo `.env` na raiz com:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/cookops"
JWT_SECRET="seu-segredo-aqui"
```

4. **Execute as migrações e seeds**

```bash
npm run migrate:dev
npm run prisma:seed
```

5. **Suba o servidor**

```bash
npm run start:dev
```

6. **Acesse a documentação Swagger**

```
http://localhost:3000/api
```

---

## 🔐 Autenticação e Perfis

- **ADMIN**: gerenciamento da plataforma
- **FUNCIONARIO**: opera pedidos, cozinha, dashboards  
  (Futuramente: `DONO`, `GERENTE` com controle de relatórios e financeiro)

---

## 🔌 WebSocket

- Namespace: `/ws/pedidos`
- Atualizações em tempo real para movimentação de pedidos entre status

---

## 📚 Considerações Finais

Este projeto faz parte do **Trabalho de Conclusão de Curso (TCC)** e tem como objetivo trazer uma solução completa e moderna para gerenciamento de pedidos em cozinhas profissionais, com foco em produtividade, organização e integração em tempo real.
