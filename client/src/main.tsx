import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

import router from "./routes/route";
import SalesProvider from "./Context/SalesProvider";
import { AuthProvider } from "./Context/AuthContext";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SalesProvider>
        <RouterProvider router={router} />
      </SalesProvider>
    </AuthProvider>
    <Toaster />
  </QueryClientProvider>
);
