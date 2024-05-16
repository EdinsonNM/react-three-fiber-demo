import "./App.css";
import Layout from "./pages/layout/layout";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
