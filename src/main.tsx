import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import './main.css'
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>
  },
  {
    path: "/home",
    element: <Home></Home>
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);