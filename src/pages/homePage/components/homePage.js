import { useAsyncValue } from "react-router-dom";
import styles from "../cssModules/homePage.module.css";
import { Video } from "./video";
import { Filtering } from "./filtering";

export const HomePage = () => {
      const loaderData = useAsyncValue();
      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      }

      return (
            <main className={styles["main"]}>
                  <Filtering></Filtering>
                  <section className={styles["videos"]}>
                        {loaderData.payload.map((video, index) => {
                              return <Video video={video}></Video>;
                        })}
                  </section>
            </main>
      );
};

export const homePageLoader = async () => {
      const response = await fetch("http://localhost:8080");
      const data = await response.json();
      return data;
};
