import { useAsyncValue } from "react-router-dom";
import styles from "../cssModules/watchHistoryPage.module.css";
import { VideoOne } from "../../../components/videos/videoOne";

export const WatchHistoryPage = () => {
      const loaderData = useAsyncValue();
      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      } else {
            return (
                  <main className={styles["main"]}>
                        <h2>Watch History</h2>
                        <div className={styles["watch-history-videos"]}>
                              {loaderData.payload.map((video, index) => {
                                    return (
                                          <VideoOne
                                                video={video}
                                                deleteAction={`/watchHistory/${video._id}`}
                                          ></VideoOne>
                                    );
                              })}
                        </div>
                  </main>
            );
      }
};
