import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const route = window.location.pathname.slice(1);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App route={route} />
  </StrictMode>
);
