import { createHashRouter } from "react-router-dom";
import Galaxy from "./pages/galaxy/galaxy";
import Spectre from "./pages/spectre/spectre";
import Layout from "./pages/layout/layout";
import Box from "./pages/box/box";
import Sphere from "./pages/sphere/sphere";
import Openai from "./pages/openai/openai";
import AnimationAI from "./pages/animation-ai/animation-ai";
import MiniWorld from "./pages/mini-world/mini-world";
import TerrainProceduralGenerator from "./pages/terrain-procedural-generator/terrain-procedural-generator";
import Explotion from "./pages/explotion/explotion";
import Wiggle from "./pages/wiggle/wiggle";
import Empty from "./pages/empty/empty";
import Ecommerce from "./pages/ecommerce/ecommerce";
import Room from "./pages/room/room";
import TensorflowApp from "./pages/tensorflow/ml.tsx";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Empty />,
      },
      {
        path: "/box",
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
      {
        path: "/animation-ai",
        element: <AnimationAI />,
      },
      {
        path: "/mini-world",
        element: <MiniWorld />,
      },
      {
        path: "/terrain-procedural-generator",
        element: <TerrainProceduralGenerator />,
      },
      {
        path: "/explotion",
        element: <Explotion />,
      },
      {
        path: "/wiggle",
        element: <Wiggle />,
      },
      {
        path: "/ecommerce",
        element: <Ecommerce />,
      },
      {
        path: "/room",
        element: <Room />,
      },
      {
        path: "/tensorflow",
        element: <TensorflowApp />,
      },
    ],
  },
]);
