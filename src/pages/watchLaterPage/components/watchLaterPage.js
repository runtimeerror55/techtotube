import { Form, useAsyncValue, useLoaderData } from "react-router-dom";
import styles from "../cssModules/watchLaterPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { VideoOne } from "../../../components/videos/videoOne";

export const WatchLaterPage = () => {
      const loaderData = useAsyncValue();
      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      } else {
            return (
                  <main className={styles["main"]}>
                        <h1>Watch Later</h1>
                        <div className={styles["watch-later-videos"]}>
                              {loaderData.payload.map((video, index) => {
                                    return (
                                          <VideoOne
                                                video={video}
                                                deleteAction={`/watchLater/${video._id}`}
                                          ></VideoOne>
                                    );
                              })}
                        </div>
                  </main>
            );
      }
};
