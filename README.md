<div align="center">

# 🍽️ CookOps

### _Revolucionando a gestão de estabelecimentos alimentícios_

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

**CookOps** é uma plataforma completa e moderna de gestão para estabelecimentos alimentícios, oferecendo controle total sobre pedidos, cardápio, produção e configurações do negócio através de uma interface intuitiva e responsiva.

</div>

## ✨ Principais Funcionalidades

<div align="center">

|   🎯 **Gestão de Pedidos**   | 📋 **Cardápio Inteligente** | ⚙️ **Configurações** |    📊 **Analytics**     |
| :--------------------------: | :-------------------------: | :------------------: | :---------------------: |
|   Dashboard em tempo real    |  CRUD completo de produtos  |   Dados da empresa   | Dashboards interativos  |
|  Sistema de status avançado  |  Categorização inteligente  | Métodos de pagamento |  Relatórios de vendas   |
| Painel de produção otimizado |     Controle de estoque     |  Notificações push   | Métricas de performance |
|      Histórico completo      |      Preços dinâmicos       |  Gestão de usuários  | Produtos mais vendidos  |

</div>

### 🎯 **Gestão de Pedidos**

- 📈 **Dashboard interativo** com visualização em tempo real e métricas importantes
- 🔄 **Sistema de status inteligente** para acompanhamento completo do fluxo
- 👨‍🍳 **Painel de produção otimizado** especialmente projetado para a cozinha
- 📚 **Histórico detalhado** com filtros avançados e busca

### 📋 **Gerenciamento de Cardápio**

- ✏️ **CRUD completo** de produtos com interface intuitiva
- 🗂️ **Categorização inteligente** com drag-and-drop
- 📦 **Controle de estoque** integrado com alertas automáticos
- 💰 **Preços dinâmicos** com promoções e descontos

### ⚙️ **Configurações Avançadas**

- 🏢 **Dados da empresa** centralizados e organizados
- 💳 **Métodos de pagamento** totalmente customizáveis
- 🔔 **Sistema de notificações** configurável por usuário
- 👥 **Gestão de usuários** com controle de permissões

### 📊 **Relatórios e Analytics**

- 📊 **Dashboards modernos** com gráficos interativos
- 📈 **Relatórios detalhados** de vendas e performance
- 🏆 **Análise de produtos** mais vendidos e rentáveis
- 💹 **Métricas de crescimento** e tendências de mercado

## 🏗️ Arquitetura do Sistema

<div align="center">

```mermaid
graph TB
    A[🌐 Next.js Frontend] --> B[🔌 API Gateway]
    B --> C[⚡ NestJS Backend]
    C --> D[🗄️ PostgreSQL]
    C --> E[🔐 JWT Auth]
    A --> F[🎨 shadcn/ui]
    A --> G[🎯 TailwindCSS]

    style A fill:#0070f3,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#e0234e,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#336791,stroke:#333,stroke-width:2px,color:#fff
```

</div>

Este projeto segue uma **arquitetura full-stack moderna** com separação clara de responsabilidades:

```
🏗️ CookOps/
├── 🎨 cooktops-frontend/          # Next.js 15 + TypeScript + shadcn/ui
│   ├── 📱 src/app/                # App Router (Next.js 15)
│   │   ├── (auth)/               # 🔐 Rotas de autenticação
│   │   ├── (logged)/             # 🔒 Rotas protegidas
│   │   │   ├── dashboard/        # 📊 Dashboard principal
│   │   │   ├── pedidos/          # 🍽️ Gestão de pedidos
│   │   │   ├── cardapio/         # 📋 Gerenciamento de cardápio
│   │   │   └── configuracoes/    # ⚙️ Configurações do sistema
│   │   └── globals.css           # 🎨 Estilos globais
│   ├── 🧩 components/            # Componentes reutilizáveis
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── forms/                # Formulários avançados
│   │   └── layout/               # Componentes de layout
│   ├── 🔗 api/                   # Services e configurações
│   └── 📦 types/                 # Definições TypeScript
│
└── ⚡ cookops-backend/            # NestJS + Prisma + PostgreSQL
    ├── 🔧 src/
    │   ├── 🔐 auth/              # Sistema de autenticação JWT
    │   ├── 🏢 empresa/           # Gestão de empresas
    │   ├── 🍽️ pedido/            # Sistema de pedidos
    │   ├── 📋 produto/           # Catálogo de produtos
    │   ├── 💳 pagamento/         # Métodos de pagamento
    │   └── 🗄️ prisma/            # Database service layer
    ├── 📊 prisma/
    │   ├── schema.prisma         # 🗂️ Schema do banco de dados
    │   └── migrations/           # 🔄 Histórico de migrações
    └── 📋 package.json           # Dependências e scripts
```

## 🚀 Stack Tecnológico

<div align="center">

### 🎨 **Frontend Moderno**

|                                              Tecnologia                                               |  Versão  | Descrição                        |
| :---------------------------------------------------------------------------------------------------: | :------: | :------------------------------- |
|       ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)        | `15.3.3` | Framework React com App Router   |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)  |  `5.0+`  | Tipagem estática para JavaScript |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=flat-square&logo=tailwind-css) |  `3.4+`  | Framework CSS utilitário         |
|          ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000?style=flat-square)          | `latest` | Sistema de componentes moderno   |
|     ![Radix](https://img.shields.io/badge/Radix_UI-latest-161618?style=flat-square&logo=radix-ui)     | `latest` | Primitivos UI acessíveis         |

### ⚡ **Backend Robusto**

|                                             Tecnologia                                              |  Versão  | Descrição                   |
| :-------------------------------------------------------------------------------------------------: | :------: | :-------------------------- |
|       ![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs)        | `11.0.1` | Framework Node.js escalável |
|      ![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748?style=flat-square&logo=prisma)       |  `5.0+`  | ORM type-safe moderno       |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=flat-square&logo=postgresql) |  `16+`   | Banco de dados relacional   |
|     ![JWT](https://img.shields.io/badge/JWT-latest-000000?style=flat-square&logo=jsonwebtokens)     | `latest` | Autenticação stateless      |

### 🛠️ **Ferramentas e Utilitários**

|   Categoria   | Tecnologias                                       |
| :-----------: | :------------------------------------------------ |
|   **UI/UX**   | Lucide React, React Table, DND Kit, Framer Motion |
|   **HTTP**    | Axios, React Query, SWR                           |
| **Validação** | Zod, Class Validator, React Hook Form             |
|  **Testes**   | Jest, Testing Library, Playwright                 |
|  **Deploy**   | Vercel, Docker, PM2                               |

</div>

## 🛠️ Guia de Instalação Completo

<div align="center">

### 📋 **Pré-requisitos**

![Node.js](https://img.shields.io/badge/Node.js-18.17+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9.0+-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/Git-latest-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

### 1️⃣ **Clone e Preparação**

```bash
# 📥 Clone o repositório
git clone https://github.com/seu-usuario/cookops.git
cd cookops

# 📂 Estrutura criada:
# cookops/
# ├── cooktops-frontend/    # 🎨 Interface do usuário
# └── cookops-backend/      # ⚡ API e lógica de negócio
```

### 2️⃣ **Configuração do Backend**

```bash
# 📁 Navegue para o backend
cd cookops-backend

# 📦 Instale as dependências
npm install

# ⚙️ Configure as variáveis de ambiente
cp .env.example .env

# 📝 Edite o arquivo .env com suas configurações:
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/cookops?schema=public"
# JWT_SECRET="sua_chave_secreta_super_segura"
# PORT=3000

# 🗄️ Execute as migrações do banco de dados
npx prisma migrate dev --name init

# 🌱 Popule o banco com dados iniciais (opcional)
npx prisma db seed

# 🚀 Inicie o servidor de desenvolvimento
npm run start:dev
```

<div align="center">
✅ **Backend rodando em:** http://localhost:3000
</div>

### 3️⃣ **Configuração do Frontend**

```bash
# 📁 Em um novo terminal, navegue para o frontend
cd cooktops-frontend

# 📦 Instale as dependências
npm install

# ⚙️ Configure as variáveis de ambiente
cp .env.local.example .env.local

# 📝 Edite o arquivo .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3000
# NEXT_PUBLIC_APP_URL=http://localhost:3001

# 🚀 Inicie o servidor de desenvolvimento
npm run dev
```

<div align="center">
✅ **Frontend rodando em:** http://localhost:3001
</div>

### 4️⃣ **Verificação da Instalação**

<div align="center">

|         Serviço         |              URL               |           Status            |
| :---------------------: | :----------------------------: | :-------------------------: |
|     🎨 **Frontend**     |     http://localhost:3001      |          ✅ Ativo           |
|   ⚡ **Backend API**    |     http://localhost:3000      |          ✅ Ativo           |
|  🗄️ **Prisma Studio**   |     http://localhost:5555      | Execute `npx prisma studio` |
| 📚 **Documentação API** | http://localhost:3000/api/docs |        ✅ Swagger UI        |

</div>

### 🐳 **Instalação com Docker (Alternativa)**

```bash
# 🏗️ Construir e executar com Docker Compose
docker-compose up -d

# ✅ Todos os serviços estarão disponíveis:
# - Frontend: http://localhost:3001
# - Backend: http://localhost:3000
# - PostgreSQL: localhost:5432
```

## 📝 Scripts e Comandos

<div align="center">

### 🎨 **Frontend (cooktops-frontend/)**

| Comando              | Descrição                                     | Ambiente        |
| :------------------- | :-------------------------------------------- | :-------------- |
| `npm run dev`        | 🚀 Servidor de desenvolvimento com hot-reload | Desenvolvimento |
| `npm run build`      | 🏗️ Build otimizado para produção              | Produção        |
| `npm run start`      | ▶️ Servidor de produção                       | Produção        |
| `npm run lint`       | 🔍 Verificação de código com ESLint           | Qualidade       |
| `npm run type-check` | 🧠 Verificação de tipos TypeScript            | Qualidade       |

### ⚡ **Backend (cookops-backend/)**

| Comando              | Descrição                  | Ambiente        |
| :------------------- | :------------------------- | :-------------- |
| `npm run start:dev`  | 🚀 Servidor com watch mode | Desenvolvimento |
| `npm run build`      | 🏗️ Compilação TypeScript   | Produção        |
| `npm run start:prod` | ▶️ Servidor de produção    | Produção        |
| `npm run test`       | 🧪 Testes unitários        | Testes          |
| `npm run test:e2e`   | 🎯 Testes end-to-end       | Testes          |

### 🗄️ **Banco de Dados (Prisma)**

| Comando                     | Descrição                    | Uso             |
| :-------------------------- | :--------------------------- | :-------------- |
| `npx prisma migrate dev`    | 🔄 Criar nova migração       | Desenvolvimento |
| `npx prisma migrate deploy` | 🚀 Aplicar migrações         | Produção        |
| `npx prisma studio`         | 🎨 Interface visual do banco | Exploração      |
| `npx prisma db seed`        | 🌱 Popular banco com dados   | Inicialização   |
| `npx prisma generate`       | ⚙️ Gerar cliente Prisma      | Build           |

</div>

**🍽️ Feito com muito ❤️ para revolucionar a gestão de estabelecimentos alimentícios**

[🌟 **Dar uma Estrela**](https://github.com/seu-usuario/cookops) • [🐛 **Reportar Bug**](https://github.com/seu-usuario/cookops/issues) • [💡 **Solicitar Feature**](https://github.com/seu-usuario/cookops/issues/new) • [🤝 **Contribuir**](CONTRIBUTING.md)

---

_Última atualização: Junho 2025 • Versão: 2.0.0 • Status: 🚀 Em desenvolvimento ativo_

</div>
