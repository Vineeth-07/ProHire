import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
