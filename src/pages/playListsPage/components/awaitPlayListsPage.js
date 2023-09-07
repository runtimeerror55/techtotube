import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import styles from "../cssModules/awaitPLayListsPage.module.css";
import { PlayListsPage } from "./playListsPage";
import { ColorRing } from "react-loader-spinner";
import { colorRingOptions } from "../../../utilities/utilities";

export const AwaitPlayListsPage = () => {
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
                        <PlayListsPage></PlayListsPage>
                  </Await>
            </Suspense>
      );
};

export const homePageLoader = async () => {
      const response = await fetch("http://localhost:8080");
      const data = await response.json();
      return data;
};
