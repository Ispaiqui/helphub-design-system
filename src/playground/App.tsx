import { useState } from "react";

import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Text } from "../components/Text";
import { useTheme } from "../components/ThemeProvider";
import { darkTheme, lightTheme, primitiveColors } from "../tokens";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "#cores", label: "Cores" },
  { href: "#tipografia", label: "Tipografia" },
  { href: "#componentes", label: "Componentes" },
  { href: "#escalas", label: "Escalas" },
];

const primitiveEntries = [
  ["white", primitiveColors.white, "fundo, card, texto em primary"],
  ["slate-50", primitiveColors.slate50, "sidebar (claro) / texto (escuro)"],
  ["slate-100", primitiveColors.slate100, "secondary, muted, accent (claro)"],
  ["slate-200", primitiveColors.slate200, "border, input (claro)"],
  ["slate-400", primitiveColors.slate400, "muted-foreground (escuro)"],
  ["slate-500", primitiveColors.slate500, "muted-foreground (claro)"],
  ["slate-800", primitiveColors.slate800, "secondary, muted, border (escuro)"],
  ["slate-900", primitiveColors.slate900, "texto (claro) / card, sidebar (escuro)"],
  ["slate-950", primitiveColors.slate950, "background (escuro)"],
  ["blue-200", primitiveColors.blue200, "chart-5 (claro)"],
  ["blue-300", primitiveColors.blue300, "chart-4 (claro)"],
  ["blue-400", primitiveColors.blue400, "chart-3 (claro), partículas"],
  ["blue-500", primitiveColors.blue500, "ring (claro), primary (escuro)"],
  ["blue-600", primitiveColors.blue600, "primary (claro), ring (escuro)"],
  ["blue-700", primitiveColors.blue700, "chart-3 (escuro)"],
  ["blue-800", primitiveColors.blue800, "chart-4 (escuro), logo"],
  ["blue-900", primitiveColors.blue900, "chart-5 (escuro)"],
  ["red-500", primitiveColors.red500, "destructive (claro)"],
  ["red-900", primitiveColors.red900, "destructive (escuro)"],
] as const;

const semanticKeys = [
  ["background", "Fundo"],
  ["foreground", "Texto"],
  ["card", "Card"],
  ["primary", "Primary"],
  ["secondary", "Secondary"],
  ["muted", "Muted"],
  ["mutedForeground", "Muted fg"],
  ["accent", "Accent"],
  ["border", "Border"],
  ["input", "Input"],
  ["ring", "Ring"],
  ["destructive", "Destructive"],
  ["sidebar", "Sidebar"],
  ["chart1", "Chart 1"],
  ["chart2", "Chart 2"],
  ["chart3", "Chart 3"],
  ["chart4", "Chart 4"],
  ["chart5", "Chart 5"],
] as const;

function LogoMark() {
  return (
    <div
      className="flex size-10 items-center justify-center rounded-lg shadow-primary"
      style={{
        background:
          "linear-gradient(135deg, var(--logo-from) 0%, var(--logo-via) 50%, var(--logo-to) 100%)",
      }}
    >
      <span className="text-lg font-extrabold tracking-tight text-primary-foreground">H</span>
    </div>
  );
}

function Swatch({ name, hex, note }: { name: string; hex: string; note?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <div className="h-16 border-b border-border" style={{ backgroundColor: hex }} />
      <div className="space-y-1 p-3">
        <Text as="span" size="sm" weight="semibold">
          {name}
        </Text>
        <Text as="span" size="xs" tone="muted" className="block font-mono">
          {hex}
        </Text>
        {note ? (
          <Text as="span" size="xs" tone="muted" className="block">
            {note}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

export function App() {
  const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const themeMap = resolvedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="flex min-h-dvh">
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-6 md:flex">
          <div className="mb-8 flex items-center gap-3">
            <LogoMark />
            <div>
              <Text as="span" weight="bold" className="block leading-tight">
                HelpHub
              </Text>
              <Text as="span" size="xs" tone="muted">
                Design System
              </Text>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto rounded-xl bg-sidebar-accent p-4">
            <Text size="xs" tone="muted">
              Pacote
            </Text>
            <Text as="span" size="sm" weight="semibold" className="block font-mono">
              @helphub/design-system
            </Text>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-[69px] items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-8">
            <div className="flex items-center gap-3 md:hidden">
              <LogoMark />
              <Text as="span" weight="bold">
                HelpHub
              </Text>
            </div>
            <Text as="span" size="sm" tone="muted" className="hidden md:inline">
              Fonte da verdade visual da HelpHub
            </Text>
            <div className="flex items-center gap-2">
              <Badge variant="muted">{resolvedTheme === "dark" ? "Escuro" : "Claro"}</Badge>
              <ThemeToggle />
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-12 sm:px-8">
            <section className="relative overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/15 blur-3xl" />
              <Badge variant="default" className="mb-4">
                v0.1.0
              </Badge>
              <Heading level={1}>
                Você cuida do produto.{" "}
                <span className="text-primary">HelpHub</span> cuida da interface.
              </Heading>
              <Text tone="muted" className="mt-4 max-w-2xl">
                Tokens CSS, tema Tailwind v4 e componentes React para reutilizar a identidade
                HelpHub em qualquer projeto Cursor — sem hex hardcoded.
              </Text>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button>Começar agora</Button>
                <Button variant="outline">Ver tokens</Button>
              </div>
            </section>

            <section id="cores" className="scroll-mt-24 space-y-6">
              <div>
                <Heading level={2}>Cores</Heading>
                <Text tone="muted" className="mt-2">
                  Paleta primitiva e papéis semânticos claro/escuro. Os hex abaixo são os únicos
                  valores de marca permitidos.
                </Text>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {primitiveEntries.map(([name, hex, note]) => (
                  <Swatch key={name} name={name} hex={hex} note={note} />
                ))}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Tema semântico ({resolvedTheme})</CardTitle>
                  <CardDescription>
                    Resolvido a partir das variáveis CSS do tema ativo.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {semanticKeys.map(([key, label]) => (
                    <Swatch key={key} name={label} hex={themeMap[key]} />
                  ))}
                </CardContent>
              </Card>
            </section>

            <section id="tipografia" className="scroll-mt-24 space-y-6">
              <Heading level={2}>Tipografia</Heading>
              <Text tone="muted">
                Inter é o padrão. Troque <code className="font-mono text-sm">--font-sans</code> no
                app consumidor para outra família.
              </Text>
              <Card>
                <CardContent className="space-y-4 pt-0">
                  <Heading level={1}>Heading 1</Heading>
                  <Heading level={2}>Heading 2</Heading>
                  <Heading level={3}>Heading 3</Heading>
                  <Text>
                    Texto padrão para parágrafos de produto, formulários e conteúdo SaaS.
                  </Text>
                  <Text size="sm" tone="muted">
                    Texto muted para metadados, dicas e labels secundários.
                  </Text>
                  <Text size="sm" tone="primary" weight="medium">
                    Texto primary para ênfase de marca.
                  </Text>
                </CardContent>
              </Card>
            </section>

            <section id="componentes" className="scroll-mt-24 space-y-6">
              <Heading level={2}>Componentes</Heading>
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Button</CardTitle>
                    <CardDescription>Variantes e tamanhos tokenizados.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                    <Button size="sm">Small</Button>
                    <Button size="lg">Large</Button>
                    <Button disabled>Disabled</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Input</CardTitle>
                    <CardDescription>Foco, erro e tamanhos via tokens.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      placeholder="nome@empresa.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setEmailError(false);
                      }}
                      aria-invalid={emailError || undefined}
                    />
                    <Input size="sm" placeholder="Input pequeno" />
                    <Input size="lg" placeholder="Input grande" />
                    <Input disabled placeholder="Desabilitado" />
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEmailError(email.length === 0)}
                    >
                      Validar
                    </Button>
                    <Text size="xs" tone={emailError ? "destructive" : "muted"}>
                      {emailError ? "Informe um e-mail." : "Nenhum hex no componente."}
                    </Text>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Badge</CardTitle>
                    <CardDescription>Status e ênfases compactas.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Badge>Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="muted">Muted</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Card</CardTitle>
                    <CardDescription>
                      Superfície com borda, raio e sombra semânticos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" tone="muted">
                      Ideal para dashboards, settings e blocos de conteúdo.
                    </Text>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Ação do card</Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            <section id="escalas" className="scroll-mt-24 space-y-6">
              <Heading level={2}>Escalas</Heading>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Raio</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-end gap-3">
                    <div className="size-14 rounded-sm bg-primary/15 ring-1 ring-border" />
                    <div className="size-14 rounded-md bg-primary/15 ring-1 ring-border" />
                    <div className="size-14 rounded-lg bg-primary/15 ring-1 ring-border" />
                    <div className="size-14 rounded-xl bg-primary/15 ring-1 ring-border" />
                    <div className="size-14 rounded-2xl bg-primary/15 ring-1 ring-border" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sombra</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl bg-card p-4 shadow-xs ring-1 ring-border">xs</div>
                    <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border">sm</div>
                    <div className="rounded-xl bg-card p-4 shadow-md ring-1 ring-border">md</div>
                    <div className="rounded-xl bg-card p-4 shadow-lg ring-1 ring-border">lg</div>
                    <div className="rounded-xl bg-card p-4 shadow-xl ring-1 ring-border">xl</div>
                    <div className="rounded-xl bg-primary p-4 text-primary-foreground shadow-primary">
                      primary
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Espaçamento</CardTitle>
                    <CardDescription>Escala de 4px do Tailwind + tokens de página.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[4, 8, 12, 16, 24, 32].map((px) => (
                      <div key={px} className="flex items-center gap-3">
                        <Text as="span" size="xs" tone="muted" className="w-10 font-mono">
                          {px}
                        </Text>
                        <div className="h-2 rounded-full bg-primary" style={{ width: px }} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Z-index e motion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Text size="sm">
                      z: base 0 · raised 10 · dropdown 20 · sticky 30 · overlay 40 · modal 50 ·
                      popover 60 · toast 70 · max 9999
                    </Text>
                    <Text size="sm" tone="muted">
                      Durações: 150ms / 200ms / 350ms · easing standard e emphasized
                    </Text>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
