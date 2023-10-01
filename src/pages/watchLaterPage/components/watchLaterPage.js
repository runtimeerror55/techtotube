import { useAsyncValue, useNavigate } from "react-router-dom";
import styles from "../cssModules/watchLaterPage.module.css";
import { VideoOne } from "../../../components/videos/videoOne";
import { useEffect } from "react";

export const WatchLaterPage = () => {
      const loaderData = useAsyncValue();
      const navigate = useNavigate();

      useEffect(() => {
            if (loaderData.status === "error") {
                  navigate("/login");
            }
      });
      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      } else {
            return (
                  <main className={styles["main"]}>
                        <h2>Watch Later</h2>
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
