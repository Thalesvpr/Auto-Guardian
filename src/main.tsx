import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";
import './main.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);