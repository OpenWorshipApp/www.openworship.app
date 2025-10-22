import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppComp from "./AppComp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppComp />
  </StrictMode>
);
