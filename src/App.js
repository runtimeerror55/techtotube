import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home_page } from "./pages/home_page/components/home_page";

const router = createBrowserRouter([
      {
            path: "/",
            element: <Home_page></Home_page>,
      },
]);
function App() {
      return <RouterProvider router={router} />;
}

export default App;
