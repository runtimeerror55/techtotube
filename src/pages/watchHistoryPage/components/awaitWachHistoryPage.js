import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import styles from "../../playListsPage/cssModules/awaitPLayListsPage.module.css";
import { WatchHistoryPage } from "./watchHistoryPage";
import { ColorRing } from "react-loader-spinner";
import { colorRingOptions } from "../../../utilities/utilities";

export const AwaitWatchHistoryPage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense
                  fallback={
                        <div className={styles["loader"]}>
                              <ColorRing {...colorRingOptions} />
                        </div>
                  }
            >
                  <Await resolve={loaderData}>
                        <WatchHistoryPage></WatchHistoryPage>
                  </Await>
            </Suspense>
      );
};
