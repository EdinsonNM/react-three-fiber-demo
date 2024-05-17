import { createHashRouter } from "react-router-dom";
import Galaxy from "./pages/galaxy/galaxy";
import Spectre from "./pages/spectre/spectre";
import Layout from "./pages/layout/layout";
import Box from "./pages/box/box";
import Sphere from "./pages/sphere/sphere";
import Openai from "./pages/openai/openai";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Box />,
      },
      {
        path: "/sphere",
        element: <Sphere />,
      },
      {
        path: "/galaxy",
        element: <Galaxy />,
      },
      {
        path: "/spectre",
        element: <Spectre />,
      },
      {
        path: "/openai",
        element: <Openai />,
      },
    ],
  },
]);
