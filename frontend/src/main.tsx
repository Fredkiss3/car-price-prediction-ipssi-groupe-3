import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { TailwindIndicator } from "./tailwind-indicator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5000, // 5 secondes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.MODE === "development" && (
        <>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <TailwindIndicator />
        </>
      )}
    </QueryClientProvider>
  </React.StrictMode>
);
