import { createBrowserRouter } from "react-router";

import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/components/Layout/dashboard/Dashboard";

import Sales from "@/page/Sales";
import MySales from "@/page/MySales";
import { LoginForm } from "@/components/Layout/auth/login-form";
import Product from "@/page/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "sales",
            element: <Sales />,
          },
          {
            path: "my-sales",
            element: <MySales />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

export default router;
