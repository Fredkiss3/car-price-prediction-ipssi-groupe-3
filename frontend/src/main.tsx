import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { TailwindIndicator } from "./tailwind-indicator";

console.log({
  mode: import.meta.env.MODE,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {import.meta.env.MODE === "development" && <TailwindIndicator />}
  </React.StrictMode>
);
