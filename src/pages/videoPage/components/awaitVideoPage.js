import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import styles from "../cssModules/awaitVideoPage.module.css";
import { VideoPage } from "./videoPage";
import { ColorRing } from "react-loader-spinner";
import { colorRingOptions } from "../../../utilities/utilities";

export const AwaitVideoPage = () => {
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
                        <VideoPage></VideoPage>
                  </Await>
            </Suspense>
      );
};
