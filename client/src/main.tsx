import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SalesProvider from "./Context/SalesProvider";
import router from "./routes/route";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SalesProvider>
      <RouterProvider router={router} />
    </SalesProvider>
    <Toaster />
  </QueryClientProvider>,
);
