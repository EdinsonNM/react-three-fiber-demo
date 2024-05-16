import { createHashRouter } from "react-router-dom";
import Galaxy from "./pages/galaxy/galaxy";

export const router = createHashRouter([
  {
    path: "/",
    element: <Galaxy />,
  },
]);
