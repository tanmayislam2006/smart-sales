import Dashboard from "@/components/Layout/Dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
]);
export default router;
