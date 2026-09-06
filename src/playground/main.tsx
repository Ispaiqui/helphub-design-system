import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "../components/ThemeProvider";
import "../styles/index.css";
import { App } from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Playground root element #root was not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
