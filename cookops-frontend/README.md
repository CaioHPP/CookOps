<div align="center">

# 🎨 CookOps Frontend

### _Interface moderna e responsiva para gestão alimentícia_

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=for-the-badge)

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](../LICENSE)

---

Interface **moderna, responsiva e intuitiva** do CookOps, construída com as mais recentes tecnologias **Next.js 15**, **TypeScript** e **shadcn/ui** para proporcionar a melhor experiência de usuário.

[🚀 **Ver Demo**](https://cookops-frontend.vercel.app) • [📖 **Documentação**](https://docs.cookops.dev/frontend) • [🎨 **Storybook**](https://storybook.cookops.dev)

</div>

## 🚀 Stack Tecnológico

<div align="center">

### 🏗️ **Core Framework**

|                                              Tecnologia                                              |  Versão  | Descrição                       | Documentação                                |
| :--------------------------------------------------------------------------------------------------: | :------: | :------------------------------ | :------------------------------------------ |
|     ![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)     | `15.3.3` | Framework React com App Router  | [Docs](https://nextjs.org/docs)             |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript) |  `5.0+`  | Superset JavaScript com tipagem | [Docs](https://www.typescriptlang.org/docs) |
|         ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)          |   `19`   | Biblioteca para interfaces      | [Docs](https://react.dev)                   |

### 🎨 **UI & Design**

|                                              Tecnologia                                               |  Versão  | Descrição                      | Documentação                         |
| :---------------------------------------------------------------------------------------------------: | :------: | :----------------------------- | :----------------------------------- |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=flat-square&logo=tailwind-css) |  `3.4+`  | Framework CSS utilitário       | [Docs](https://tailwindcss.com/docs) |
|          ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000?style=flat-square)          | `latest` | Sistema de componentes moderno | [Docs](https://ui.shadcn.com)        |
|     ![Radix UI](https://img.shields.io/badge/Radix-latest-161618?style=flat-square&logo=radix-ui)     | `latest` | Primitivos acessíveis          | [Docs](https://www.radix-ui.com)     |
|      ![Lucide](https://img.shields.io/badge/Lucide-latest-F56565?style=flat-square&logo=lucide)       | `latest` | Ícones SVG modernos            | [Docs](https://lucide.dev)           |

### 📡 **Data & HTTP**

|                                                 Tecnologia                                                 | Versão | Descrição                      | Documentação                        |
| :--------------------------------------------------------------------------------------------------------: | :----: | :----------------------------- | :---------------------------------- |
|           ![Axios](https://img.shields.io/badge/Axios-1.6+-5A29E4?style=flat-square&logo=axios)            | `1.6+` | Cliente HTTP robusto           | [Docs](https://axios-http.com/docs) |
| ![React Query](https://img.shields.io/badge/TanStack_Query-5.0+-FF4154?style=flat-square&logo=react-query) | `5.0+` | Gerenciamento de estado server | [Docs](https://tanstack.com/query)  |
|         ![React Table](https://img.shields.io/badge/TanStack_Table-8.0+-FF4154?style=flat-square)          | `8.0+` | Tabelas avançadas e flexíveis  | [Docs](https://tanstack.com/table)  |

### 🛠️ **Ferramentas & Utilitários**

|                                           Tecnologia                                           | Versão | Descrição                         | Documentação                     |
| :--------------------------------------------------------------------------------------------: | :----: | :-------------------------------- | :------------------------------- |
|    ![ESLint](https://img.shields.io/badge/ESLint-9.0+-4B32C3?style=flat-square&logo=eslint)    | `9.0+` | Linter para JavaScript/TypeScript | [Docs](https://eslint.org/docs)  |
| ![Prettier](https://img.shields.io/badge/Prettier-3.0+-F7B93E?style=flat-square&logo=prettier) | `3.0+` | Formatador de código              | [Docs](https://prettier.io/docs) |
|  ![PostCSS](https://img.shields.io/badge/PostCSS-8.4+-DD3A0A?style=flat-square&logo=postcss)   | `8.4+` | Transformador CSS                 | [Docs](https://postcss.org)      |

</div>

### 📂 **Estrutura Detalhada**

```bash
📁 src/
├── 🌍 app/                     # App Router (Next.js 15)
│   ├── 🔐 (auth)/             # Grupo de rotas de autenticação
│   │   ├── login/             # Página de login
│   │   ├── register/          # Página de cadastro
│   │   └── layout.tsx         # Layout das páginas de auth
│   ├── 🔒 (logged)/           # Grupo de rotas protegidas
│   │   ├── 📊 dashboard/      # Dashboard principal
│   │   │   ├── analytics/     # Analytics detalhados
│   │   │   ├── reports/       # Relatórios
│   │   │   └── page.tsx       # Página principal do dashboard
│   │   ├── 🍽️ pedidos/        # Gestão de pedidos
│   │   │   ├── [id]/          # Detalhes do pedido
│   │   │   ├── novo/          # Criar pedido
│   │   │   └── components/    # Componentes específicos
│   │   ├── 📋 cardapio/       # Gerenciamento de cardápio
│   │   │   ├── produtos/      # CRUD de produtos
│   │   │   ├── categorias/    # Gestão de categorias
│   │   │   └── components/    # Componentes do cardápio
│   │   ├── ⚙️ configuracoes/   # Configurações do sistema
│   │   │   ├── empresa/       # Dados da empresa
│   │   │   ├── usuarios/      # Gestão de usuários
│   │   │   ├── pagamentos/    # Métodos de pagamento
│   │   │   └── components/    # Componentes de config
│   │   └── layout.tsx         # Layout das páginas logadas
│   ├── 🌐 globals.css         # Estilos globais + Tailwind
│   ├── 📄 layout.tsx          # Layout raiz da aplicação
│   ├── 🏠 page.tsx            # Página inicial (landing)
│   └── 🚫 not-found.tsx       # Página 404 customizada
├── 🔗 api/                    # Camada de comunicação
│   ├── ⚙️ services/           # Services para cada módulo
│   │   ├── auth.service.ts    # Autenticação
│   │   ├── pedido.service.ts  # Gestão de pedidos
│   │   ├── produto.service.ts # Gestão de produtos
│   │   └── empresa.service.ts # Gestão da empresa
│   ├── 📋 types/              # Tipos TypeScript da API
│   │   ├── auth.types.ts      # Tipos de autenticação
│   │   ├── pedido.types.ts    # Tipos de pedidos
│   │   └── comum.types.ts     # Tipos comuns
│   └── 🔧 config/             # Configurações da API
│       ├── axios.config.ts    # Configuração do Axios
│       └── endpoints.ts       # URLs dos endpoints
├── 🧩 components/             # Componentes reutilizáveis
│   ├── 🎨 ui/                 # Componentes base (shadcn/ui)
│   │   ├── button.tsx         # Botões estilizados
│   │   ├── input.tsx          # Inputs customizados
│   │   ├── dialog.tsx         # Modais e dialogs
│   │   ├── table.tsx          # Tabelas responsivas
│   │   └── ...                # Outros componentes UI
│   ├── 📝 forms/              # Formulários complexos
│   │   ├── ProdutoForm.tsx    # Formulário de produtos
│   │   ├── PedidoForm.tsx     # Formulário de pedidos
│   │   └── EmpresaForm.tsx    # Formulário da empresa
│   ├── 📱 layout/             # Componentes de layout
│   │   ├── Header.tsx         # Cabeçalho
│   │   ├── Sidebar.tsx        # Menu lateral
│   │   ├── Footer.tsx         # Rodapé
│   │   └── Breadcrumb.tsx     # Navegação breadcrumb
│   └── 🛠️ common/             # Componentes comuns
│       ├── LoadingSpinner.tsx # Indicador de carregamento
│       ├── ErrorBoundary.tsx  # Tratamento de erros
│       └── ConfirmDialog.tsx  # Dialog de confirmação
├── 🔧 hooks/                  # Custom React Hooks
│   ├── useAuth.ts             # Hook de autenticação
│   ├── usePedidos.ts          # Hook para pedidos
│   ├── useProdutos.ts         # Hook para produtos
│   └── useLocalStorage.ts     # Hook para localStorage
├── 📚 lib/                    # Utilitários e configurações
│   ├── utils.ts               # Funções utilitárias
│   ├── validations.ts         # Esquemas de validação (Zod)
│   ├── constants.ts           # Constantes da aplicação
│   └── cn.ts                  # Utility para classes CSS
├── 📋 types/                  # Definições de tipos globais
│   ├── global.types.ts        # Tipos globais
│   ├── form.types.ts          # Tipos de formulários
│   └── component.types.ts     # Tipos de componentes
└── 🎨 assets/                 # Recursos estáticos
    ├── images/                # Imagens
    ├── icons/                 # Ícones customizados
    └── fonts/                 # Fontes locais
```

### 🎯 **Padrões de Arquitetura**

- **🔄 App Router**: Roteamento moderno do Next.js 15
- **📱 Mobile-First**: Design responsivo em todos os componentes
- **🧩 Component-Based**: Arquitetura baseada em componentes reutilizáveis
- **🎨 Design System**: Sistema consistente com shadcn/ui
- **🔒 Route Protection**: Middleware para proteção de rotas
- **📡 API Layer**: Camada dedicada para comunicação com backend

## 🛠️ Guia de Configuração Detalhado

### 📋 **Pré-requisitos**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.17+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9.0+-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-latest-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

### 1️⃣ **Instalação das Dependências**

```powershell
# 📦 Instalar todas as dependências
npm install

# 🔍 Verificar versões instaladas
npm list --depth=0
```

### 2️⃣ **Configuração de Ambiente**

```powershell
# 📝 Criar arquivo de configuração
Copy-Item .env.local.example .env.local

# ✏️ Editar configurações
notepad .env.local
```

**Configurações do arquivo `.env.local`:**

```env
# 🔗 URLs da aplicação
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001

# 🔑 Chaves de API (opcional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# 🎨 Configurações de UI
NEXT_PUBLIC_THEME=light
NEXT_PUBLIC_DEFAULT_LOCALE=pt-BR

# 🐛 Configurações de desenvolvimento
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=info
```

### 3️⃣ **Executar em Desenvolvimento**

```powershell
# 🚀 Iniciar servidor de desenvolvimento
npm run dev

# 🔧 Ou com configurações específicas
npm run dev -- --port 3001 --hostname 0.0.0.0
```

<div align="center">
✅ **Aplicação rodando em:** http://localhost:3001
</div>

### 4️⃣ **Verificação da Instalação**

```powershell
# 🧪 Verificar TypeScript
npm run type-check

# 🔍 Verificar linting
npm run lint

# 🏗️ Testar build
npm run build
```

## 📝 Scripts e Comandos

<div align="center">

### 🚀 **Scripts de Desenvolvimento**

| Comando             | Descrição                  | Ambiente        | Porta |
| :------------------ | :------------------------- | :-------------- | :---- |
| `npm run dev`       | 🔥 Servidor com hot-reload | Desenvolvimento | 3001  |
| `npm run dev:debug` | 🐛 Modo debug ativo        | Desenvolvimento | 3001  |
| `npm run dev:https` | 🔒 Servidor HTTPS local    | Desenvolvimento | 3001  |

### 🏗️ **Scripts de Build**

| Comando          | Descrição               | Saída    | Otimização   |
| :--------------- | :---------------------- | :------- | :----------- |
| `npm run build`  | 📦 Build de produção    | `.next/` | ✅ Completa  |
| `npm run start`  | 🚀 Servidor de produção | -        | ✅ Otimizado |
| `npm run export` | 📤 Export estático      | `out/`   | ✅ Estático  |

### 🔍 **Scripts de Qualidade**

| Comando              | Descrição                   | Escopo              | Correção |
| :------------------- | :-------------------------- | :------------------ | :------- |
| `npm run lint`       | 🔍 Verificar código         | Todos os arquivos   | Manual   |
| `npm run lint:fix`   | 🔧 Corrigir automaticamente | Todos os arquivos   | ✅ Auto  |
| `npm run type-check` | 🧠 Verificar tipos TS       | Todos os `.ts/.tsx` | Manual   |
| `npm run format`     | 🎨 Formatar código          | Todos os arquivos   | ✅ Auto  |

### 🧪 **Scripts de Teste** (Planejados)

| Comando                 | Descrição                 | Tipo      | Coverage |
| :---------------------- | :------------------------ | :-------- | :------- |
| `npm run test`          | 🧪 Executar testes        | Unitários | ✅       |
| `npm run test:watch`    | 👀 Testes em watch mode   | Unitários | ✅       |
| `npm run test:e2e`      | 🎯 Testes end-to-end      | E2E       | ✅       |
| `npm run test:coverage` | 📊 Relatório de cobertura | Todos     | ✅       |

</div>

### 🔧 **Scripts Personalizados**

```powershell
# 🎨 Adicionar novo componente shadcn/ui
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog

# 🧩 Gerar componente customizado
npm run generate:component NomeDoComponente

# 📊 Analisar bundle
npm run analyze

# 🧹 Limpar cache e dependências
npm run clean
npm run fresh-install
```

## 🎨 Sistema de Design e UI

<div align="center">

### 🎭 **shadcn/ui Components**

![Components](https://img.shields.io/badge/Components-50+-000000?style=for-the-badge&logo=react)
![Themes](https://img.shields.io/badge/Themes-Light%20%7C%20Dark-6366f1?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-22c55e?style=for-the-badge)

</div>

### 🧩 **Componentes Disponíveis**

|      Categoria      | Componentes                               | Status | Customização |
| :-----------------: | :---------------------------------------- | :----: | :----------- |
| **📝 Formulários**  | Button, Input, Select, Textarea, Checkbox |   ✅   | Alta         |
| **📊 Data Display** | Table, Card, Badge, Avatar, Progress      |   ✅   | Alta         |
|   **🔔 Feedback**   | Alert, Toast, Dialog, Tooltip             |   ✅   | Média        |
|  **🧭 Navegação**   | Tabs, Breadcrumb, Pagination, Menu        |   ✅   | Alta         |
|    **📱 Layout**    | Container, Grid, Flex, Separator          |   ✅   | Alta         |

### ➕ **Adicionando Novos Componentes**

```powershell
# 🧩 Componentes básicos
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card

# 📋 Componentes de formulário
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add textarea

# 📊 Componentes de dados
npx shadcn@latest add table
npx shadcn@latest add chart
npx shadcn@latest add data-table

# 🔔 Componentes de feedback
npx shadcn@latest add toast
npx shadcn@latest add alert-dialog
npx shadcn@latest add sonner
```

## 🔒 Autenticação

O sistema de autenticação utiliza:

- **JWT tokens** para sessões
- **localStorage** para persistência
- **Middleware** para proteção de rotas
- **Context API** para estado global

### Fluxo de Autenticação

1. Login → Recebe JWT token
2. Token armazenado no localStorage
3. Middleware verifica token em rotas protegidas
4. Context fornece dados do usuário logado

## 📱 Responsividade

O design é **mobile-first** com breakpoints:

- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+
- **2xl**: 1536px+

## 🔧 Configurações Avançadas

### Next.js Config

```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost"],
  },
};
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🧪 Testes

### Estrutura de Testes (Planejado)

```
tests/
├── __mocks__/           # Mocks globais
├── components/          # Testes de componentes
├── pages/              # Testes de páginas
├── hooks/              # Testes de hooks
└── utils/              # Testes de utilitários
```

### Executar Testes

```bash
npm run test            # Executar testes
npm run test:watch      # Executar em modo watch
npm run test:coverage   # Executar com coverage
```

## 📚 Recursos Adicionais

- **[Next.js Docs](https://nextjs.org/docs)** - Documentação do Next.js
- **[shadcn/ui](https://ui.shadcn.com/)** - Sistema de componentes
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Documentação do Tailwind
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos acessíveis
- **[Lucide Icons](https://lucide.dev/)** - Biblioteca de ícones SVG
- **[Axios](https://axios-http.com/docs/intro)** - Cliente HTTP

  **Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento frontend**

## 📊 Dashboard Dinâmico - Novas Funcionalidades

### 🎯 **Seleção de Períodos Inteligente**

O dashboard agora oferece análise temporal dinâmica com diferentes granularidades:

#### 📅 **Períodos Disponíveis**

- **7 dias** → Visualização por **dias** (7 pontos no gráfico)
- **30 dias** → Visualização por **semanas** (4-5 pontos no gráfico)
- **90 dias** → Visualização por **semanas** (12 pontos no gráfico)
- **6 meses** → Visualização por **meses** (6 pontos no gráfico)
- **1 ano** → Visualização por **meses** (12 pontos no gráfico)

#### 🔄 **Funcionalidades Implementadas**

- **Título dinâmico** do gráfico baseado no período selecionado
- **Descrição automática** da granularidade temporal
- **Indicadores visuais** do período e unidade de tempo
- **Detecção de dados mock** com avisos para o usuário
- **Geração inteligente** de dados quando backend não suporta o período

#### 🛠️ **Componentes Implementados**

```typescript
// 📁 components/Dashboard/ - 5 componentes especializados
AdvancedExport.tsx; // Exportação em múltiplos formatos
AdvancedSettings.tsx; // Configurações personalizáveis
ChartDrilldown.tsx; // Análise detalhada de gráficos
DashboardConfig.tsx; // Configuração visual
PeriodComparison.tsx; // Comparação de períodos

// 📁 hooks/ - 3 hooks especializados
useChartDrilldown.ts; // Drill-down interativo
useChartExport.ts; // Exportação avançada
useDashboardSettings.ts; // Configurações
```

#### 🎨 **Interface Melhorada**

- **Badges indicadores** mostrando período atual e granularidade
- **Avisos visuais** quando dados são de demonstração
- **Seletor de período** com opções 6 meses e 1 ano
- **Responsividade** mantida em todos os dispositivos
- **Drill-down interativo** em gráficos
- **Exportação avançada** em múltiplos formatos

### 🔄 **Próximos Passos**

1. **Implementação Backend** - Agregações mensais e diárias para períodos longos
2. **Filtros Avançados** - Status e fonte de pedidos
3. **Exportação** - Dados específicos por período
4. **Testes Automatizados** - Cobertura completa das funcionalidades
