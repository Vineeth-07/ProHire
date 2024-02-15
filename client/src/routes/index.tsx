import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
