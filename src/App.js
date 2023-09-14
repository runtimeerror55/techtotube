import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AwaitHomePage } from "./pages/homePage/components/awaitHomePage";
import {
      homePageLoader,
      playListsLoader,
      watchLaterPageLoader,
      VideoPageLoader,
} from "./loaders/loaders";
import {
      addToWatchLater,
      playListActions,
      playListVideoActions,
      loginAction,
      registerAction,
} from "./actions/actions";
import { NavBar } from "./components/navBar/navBar";
import { AwaitPlayListsPage } from "./pages/playListsPage/components/awaitPlayListsPage";
import { AwaitWatchLaterPage } from "./pages/watchLaterPage/components/awaitWachLaterPage";
import { AwaitVideoPage } from "./pages/videoPage/components/awaitVideoPage";
import { AuthProvider } from "./context/authentication";
import { LoginPage } from "./pages/loginPage/components/loginPage";
import { RegisterPage } from "./pages/registerPage/components/registerPage";
const router = createBrowserRouter([
      {
            path: "/",
            element: <NavBar></NavBar>,
            children: [
                  {
                        path: "",
                        element: <AwaitHomePage></AwaitHomePage>,
                        loader: homePageLoader,
                  },
                  {
                        path: "playLists",
                        element: <AwaitPlayListsPage></AwaitPlayListsPage>,
                        loader: playListsLoader,
                        action: playListActions,
                        shouldRevalidate: ({ formAction }) => {
                              if (formAction.includes("/watchLater")) {
                                    return false;
                              }
                              return true;
                        },
                  },
                  {
                        path: "watchLater",
                        element: <AwaitWatchLaterPage></AwaitWatchLaterPage>,
                        loader: watchLaterPageLoader,
                  },
                  {
                        path: "videos/:videoId",
                        element: <AwaitVideoPage></AwaitVideoPage>,
                        loader: VideoPageLoader,
                        shouldRevalidate: () => {
                              return true;
                        },
                  },
            ],
      },
      {
            path: "/watchLater/:videoId",
            action: addToWatchLater,
      },

      {
            path: "/playLists/:playListId/:videoId",
            action: playListVideoActions,
      },
      {
            path: "/playLists/:playListId",
            action: playListActions,
      },
      {
            path: "/login",
            element: <LoginPage></LoginPage>,
            action: loginAction,
      },
      {
            path: "/register",
            element: <RegisterPage></RegisterPage>,
            action: registerAction,
      },
]);
function App() {
      return (
            <AuthProvider>
                  <RouterProvider router={router} />
            </AuthProvider>
      );
}

export default App;
