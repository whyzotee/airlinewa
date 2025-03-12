import "@/lib/dayjs";
import "./styles.css";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { StrictMode } from "react";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
