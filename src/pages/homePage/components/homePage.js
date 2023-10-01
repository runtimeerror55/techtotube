import { useState } from "react";
import { useAsyncValue } from "react-router-dom";
import styles from "../cssModules/homePage.module.css";
import { Video } from "./video";
import { Filtering } from "./filtering";
import { PageLandingLoader } from "../../../components/loaders/pageLandingLoader";

export const HomePage = () => {
      const [loaderData, setLoaderData] = useState(useAsyncValue());
      const [showFilterChangeLoader, setFilterChangeLoader] = useState(false);
      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      }

      return (
            <main className={styles["main"]}>
                  <Filtering
                        setLoaderData={setLoaderData}
                        setFilterChangeLoader={setFilterChangeLoader}
                  ></Filtering>

                  <section className={styles["videos"]}>
                        {showFilterChangeLoader ? (
                              <PageLandingLoader></PageLandingLoader>
                        ) : (
                              loaderData.payload.map((video, index) => {
                                    return <Video video={video}></Video>;
                              })
                        )}
                  </section>
            </main>
      );
};

// export const homePageLoader = async () => {
//       const response = await fetch("http://localhost:8080");
//       const data = await response.json();
//       return data;
// };
