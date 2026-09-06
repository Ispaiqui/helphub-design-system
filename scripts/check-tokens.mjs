import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const cssPath = resolve(import.meta.dirname, "../src/styles/tokens.css");
const css = readFileSync(cssPath, "utf8");

const primitives = {
  "--hh-white": "#ffffff",
  "--hh-slate-50": "#f8fafc",
  "--hh-slate-100": "#f1f5f9",
  "--hh-slate-200": "#e2e8f0",
  "--hh-slate-400": "#94a3b8",
  "--hh-slate-500": "#64748b",
  "--hh-slate-800": "#1e293b",
  "--hh-slate-900": "#0f172a",
  "--hh-slate-950": "#020617",
  "--hh-blue-200": "#bfdbfe",
  "--hh-blue-300": "#93c5fd",
  "--hh-blue-400": "#60a5fa",
  "--hh-blue-500": "#3b82f6",
  "--hh-blue-600": "#2563eb",
  "--hh-blue-700": "#1d4ed8",
  "--hh-blue-800": "#1e40af",
  "--hh-blue-900": "#1e3a8a",
  "--hh-red-500": "#ef4444",
  "--hh-red-900": "#7f1d1d",
};

const lightRoles = {
  "--background": "--hh-white",
  "--foreground": "--hh-slate-900",
  "--card": "--hh-white",
  "--card-foreground": "--hh-slate-900",
  "--popover": "--hh-white",
  "--popover-foreground": "--hh-slate-900",
  "--primary": "--hh-blue-600",
  "--primary-foreground": "--hh-white",
  "--secondary": "--hh-slate-100",
  "--secondary-foreground": "--hh-slate-900",
  "--muted": "--hh-slate-100",
  "--muted-foreground": "--hh-slate-500",
  "--accent": "--hh-slate-100",
  "--accent-foreground": "--hh-slate-900",
  "--destructive": "--hh-red-500",
  "--border": "--hh-slate-200",
  "--input": "--hh-slate-200",
  "--ring": "--hh-blue-500",
  "--chart-1": "--hh-blue-600",
  "--chart-2": "--hh-blue-500",
  "--chart-3": "--hh-blue-400",
  "--chart-4": "--hh-blue-300",
  "--chart-5": "--hh-blue-200",
  "--sidebar": "--hh-slate-50",
  "--sidebar-foreground": "--hh-slate-900",
  "--sidebar-primary": "--hh-blue-600",
  "--sidebar-primary-foreground": "--hh-white",
  "--sidebar-accent": "--hh-slate-100",
  "--sidebar-accent-foreground": "--hh-slate-900",
  "--sidebar-border": "--hh-slate-200",
  "--sidebar-ring": "--hh-blue-500",
};

const darkRoles = {
  "--background": "--hh-slate-950",
  "--foreground": "--hh-slate-50",
  "--card": "--hh-slate-900",
  "--card-foreground": "--hh-slate-50",
  "--popover": "--hh-slate-900",
  "--popover-foreground": "--hh-slate-50",
  "--primary": "--hh-blue-500",
  "--primary-foreground": "--hh-white",
  "--secondary": "--hh-slate-800",
  "--secondary-foreground": "--hh-slate-50",
  "--muted": "--hh-slate-800",
  "--muted-foreground": "--hh-slate-400",
  "--accent": "--hh-slate-800",
  "--accent-foreground": "--hh-slate-50",
  "--destructive": "--hh-red-900",
  "--border": "--hh-slate-800",
  "--input": "--hh-slate-800",
  "--ring": "--hh-blue-600",
  "--chart-1": "--hh-blue-500",
  "--chart-2": "--hh-blue-600",
  "--chart-3": "--hh-blue-700",
  "--chart-4": "--hh-blue-800",
  "--chart-5": "--hh-blue-900",
  "--sidebar": "--hh-slate-900",
  "--sidebar-foreground": "--hh-slate-50",
  "--sidebar-primary": "--hh-blue-500",
  "--sidebar-primary-foreground": "--hh-white",
  "--sidebar-accent": "--hh-slate-800",
  "--sidebar-accent-foreground": "--hh-slate-50",
  "--sidebar-border": "--hh-slate-800",
  "--sidebar-ring": "--hh-blue-600",
};

function blockBetween(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  if (start === -1) {
    throw new Error(`Missing block starting with ${startMarker}`);
  }
  const from = source.indexOf("{", start);
  if (endMarker) {
    const end = source.indexOf(endMarker, from);
    return source.slice(from, end === -1 ? undefined : end);
  }
  return source.slice(from);
}

function declaredValue(block, name) {
  const match = block.match(new RegExp(`${name}:\\s*([^;]+);`));
  return match ? match[1].trim() : null;
}

const errors = [];
const rootBlock = blockBetween(css, ":root", "\n.dark");
const darkBlock = blockBetween(css, ".dark", null);

for (const [name, hex] of Object.entries(primitives)) {
  const value = declaredValue(rootBlock, name);
  if (value !== hex) {
    errors.push(`${name} expected ${hex}, got ${value}`);
  }
}

function assertRoles(block, roles, label) {
  for (const [name, primitive] of Object.entries(roles)) {
    const value = declaredValue(block, name);
    const expected = `var(${primitive})`;
    if (value !== expected) {
      errors.push(`${label} ${name} expected ${expected}, got ${value}`);
    }
  }
}

assertRoles(rootBlock, lightRoles, "light");
assertRoles(darkBlock, darkRoles, "dark");

const forbiddenInComponents = /#[0-9a-fA-F]{3,8}/;
const componentFiles = [
  "src/components/Button.tsx",
  "src/components/Input.tsx",
  "src/components/Card.tsx",
  "src/components/Badge.tsx",
  "src/components/Text.tsx",
  "src/components/Heading.tsx",
  "src/components/ThemeProvider.tsx",
];

for (const file of componentFiles) {
  const source = readFileSync(resolve(import.meta.dirname, "..", file), "utf8");
  if (forbiddenInComponents.test(source)) {
    errors.push(`${file} contains a hardcoded hex color`);
  }
}

if (errors.length > 0) {
  console.error("Token check failed:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log("Token check passed: primitives, light/dark roles, and component hex-free.");
