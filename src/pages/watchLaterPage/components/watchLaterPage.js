import { Form, useLoaderData } from "react-router-dom";
import styles from "../cssModules/watchLaterPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PVideo } from "../../playListsPage/components/video";

export const WatchLaterPage = () => {
      const videos = useLoaderData().payload;
      console.log(videos);
      return (
            <main className={styles["main"]}>
                  <h1>Watch Later</h1>
                  <div className={styles["play-list-videos"]}>
                        {videos.map((video, index) => {
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
};
