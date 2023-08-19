import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/homePage/components/home_page";
import { NavBar } from "./components/navBar/navBar";
import "./App.css";

const router = createBrowserRouter([
      {
            path: "/",
            element: <NavBar></NavBar>,
            children: [
                  {
                        path: "/",
                        element: <HomePage></HomePage>,
                  },
            ],
      },
]);
function App() {
      return <RouterProvider router={router} />;
}

export default App;
