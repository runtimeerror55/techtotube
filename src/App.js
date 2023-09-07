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
} from "./actions/actions";
import { NavBar } from "./components/navBar/navBar";
import { AwaitPlayListsPage } from "./pages/playListsPage/components/awaitPlayListsPage";
import { WatchLaterPage } from "./pages/watchLaterPage/components/watchLaterPage";
import { AwaitVideoPage } from "./pages/videoPage/components/awaitVideoPage";

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
                  },
                  {
                        path: "watchLater",
                        element: <WatchLaterPage></WatchLaterPage>,
                        loader: watchLaterPageLoader,
                  },
                  {
                        path: "videos/:videoId",
                        element: <AwaitVideoPage></AwaitVideoPage>,
                        loader: VideoPageLoader,
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
]);
function App() {
      return <RouterProvider router={router} />;
}

export default App;
