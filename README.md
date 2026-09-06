# HelpHub Design System

Sistema de design da **HelpHub** — a fonte da verdade visual, cloneável e reutilizável em projetos Cursor e em qualquer app React.

Pacote: [`@helphub/design-system`](https://github.com/Ispaiqui/helphub-design-system)

> Você cuida do produto. A HelpHub cuida da interface.

## O que este repositório entrega

- Tokens CSS como fonte da verdade (hex só em `src/styles/tokens.css`)
- Mapeamento Tailwind v4 (`bg-background`, `text-primary`, `rounded-lg`, …)
- Componentes React + TypeScript: `Button`, `Input`, `Card`, `Badge`, `Text`, `Heading`, `ThemeProvider`
- Escalas de espaçamento, raio, sombra, z-index e motion
- Playground Vite com tema claro/escuro
- Regras para agentes Cursor (`AGENTS.md` e `.cursor/rules`)

## Scripts

```bash
pnpm install
pnpm dev            # playground em http://localhost:5173
pnpm typecheck
pnpm check:tokens   # valida hex e papéis semânticos
pnpm build          # build do playground
pnpm build:lib      # build da biblioteca + tipos + CSS
```

## Como usar em outro projeto Cursor

### 1. Clone como fonte (recomendado)

Clone ou adicione este repositório como referência. Importe o CSS no entry do Tailwind e os componentes pelo alias local:

```css
/* app/globals.css ou src/index.css */
@import "tailwindcss";
@import "@helphub/design-system/styles.css";
```

```tsx
import {
  Button,
  Card,
  Heading,
  ThemeProvider,
} from "@helphub/design-system";
```

Se o pacote ainda não estiver publicado no npm, aponte o dependency para o Git:

```json
{
  "dependencies": {
    "@helphub/design-system": "github:Ispaiqui/helphub-design-system"
  }
}
```

Ou use um path/workspace local:

```json
{
  "dependencies": {
    "@helphub/design-system": "workspace:*"
  }
}
```

### 2. Envolva a árvore com o tema

```tsx
import { ThemeProvider, Button } from "@helphub/design-system";
import "@helphub/design-system/styles.css";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Button>Começar agora</Button>
    </ThemeProvider>
  );
}
```

O `ThemeProvider` aplica a classe `.dark` em `document.documentElement` e persiste a escolha em `localStorage` (`helphub-theme`).

### 3. Tipografia

O padrão é **Inter**. Troque a família sem mexer nos componentes:

```css
:root {
  --font-sans: "Sua Fonte", ui-sans-serif, system-ui, sans-serif;
}
```

Carregue o arquivo da fonte no host (Google Fonts, `next/font`, `@fontsource`, etc.).

## Tokens de cor (obrigatórios)

Hex aparece **somente** como primitivos. Papéis semânticos referenciam esses primitivos.

### Neutros

| Token | Hex | Uso |
| --- | --- | --- |
| `white` | `#ffffff` | fundo, card, texto em primary |
| `slate-50` | `#f8fafc` | sidebar (claro) / texto (escuro) |
| `slate-100` | `#f1f5f9` | secondary, muted, accent (claro) |
| `slate-200` | `#e2e8f0` | border, input (claro) |
| `slate-400` | `#94a3b8` | muted-foreground (escuro) |
| `slate-500` | `#64748b` | muted-foreground (claro) |
| `slate-800` | `#1e293b` | secondary, muted, border (escuro) |
| `slate-900` | `#0f172a` | texto (claro) / card, sidebar (escuro) |
| `slate-950` | `#020617` | background (escuro) |

### Azuis

| Token | Hex | Uso |
| --- | --- | --- |
| `blue-200` | `#bfdbfe` | chart-5 (claro) |
| `blue-300` | `#93c5fd` | chart-4 (claro) |
| `blue-400` | `#60a5fa` | chart-3 (claro), partículas de loading |
| `blue-500` | `#3b82f6` | ring (claro), primary (escuro) |
| `blue-600` | `#2563eb` | primary (claro), ring (escuro) |
| `blue-700` | `#1d4ed8` | chart-3 (escuro) |
| `blue-800` | `#1e40af` | chart-4 (escuro), gradiente do logo |
| `blue-900` | `#1e3a8a` | chart-5 (escuro) |

### Destructive

| Token | Hex | Uso |
| --- | --- | --- |
| `red-500` | `#ef4444` | destructive (claro) |
| `red-900` | `#7f1d1d` | destructive (escuro) |

Não invente cores de marca alternativas. Se um papel novo for necessário, derive de um primitivo existente.

## Componentes

Todos consomem tokens via classes Tailwind (`bg-primary`, `text-muted-foreground`, `border-border`, …). Nenhum componente de UI contém hex.

```tsx
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Input,
  Text,
} from "@helphub/design-system";

<Card>
  <CardHeader>
    <CardTitle>Contato</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    <Heading level={3}>Fale com a HelpHub</Heading>
    <Text tone="muted">Respondemos em horário comercial.</Text>
    <Input placeholder="nome@empresa.com" />
    <Button>Enviar</Button>
    <Badge>Novo</Badge>
  </CardContent>
</Card>
```

## Exports do pacote

| Export | Conteúdo |
| --- | --- |
| `@helphub/design-system` | Componentes, `cn`, tokens TS |
| `@helphub/design-system/styles.css` | Tailwind + tokens + `@theme` |
| `@helphub/design-system/tokens.css` | Só variáveis CSS |
| `@helphub/design-system/theme.css` | Só o mapeamento `@theme` |

## Regras para o Cursor

Este repositório inclui:

- [`AGENTS.md`](./AGENTS.md) — contrato para agentes
- [`.cursor/rules/helphub-design-system.mdc`](./.cursor/rules/helphub-design-system.mdc) — regras sempre aplicadas

Em outro projeto, clone estas regras ou aponte o agente para este repositório como fonte da verdade visual.

## Licença

[MIT](./LICENSE)
