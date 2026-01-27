import { createBrowserRouter } from "react-router";
import { LoginForm } from "@/components/Layout/auth/login-form";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/components/Layout/dashboard/Dashboard";
import Product from "@/page/Product";
import Sales from "@/page/Sales";
import MySales from "@/page/MySales";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/product",
        element: (
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-sales",
        element: (
          <PrivateRoute>
            <MySales />
          </PrivateRoute>
        ),
      },
      {
        path: "/sales",
        element: (
          <PrivateRoute>
            <Sales />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

export default router;
