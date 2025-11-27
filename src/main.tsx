import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const runtimeInfo = {
  viteMode: import.meta.env.MODE,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  location: window.location.href,
};

console.groupCollapsed(
  "%c[Bootstrap] Initializing Suncity enrollment front-end",
  "color:#f59e0b; font-weight:bold;"
);
console.table(runtimeInfo);
console.groupEnd();

createRoot(document.getElementById("root")!).render(<App />);
