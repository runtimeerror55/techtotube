import { Form, useAsyncValue, useLoaderData } from "react-router-dom";
import styles from "../cssModules/watchLaterPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PVideo } from "../../playListsPage/components/video";

export const WatchLaterPage = () => {
      const loaderData = useAsyncValue();
      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      } else {
            return (
                  <main className={styles["main"]}>
                        <h1>Watch Later</h1>
                        <div className={styles["play-list-videos"]}>
                              {loaderData.payload.map((video, index) => {
                                    return (
                                          <PVideo
                                                video={video}
                                                deleteAction={`/watchLater/${video._id}`}
                                          ></PVideo>
                                    );
                              })}
                        </div>
                  </main>
            );
      }
};
