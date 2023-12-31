import { useEffect } from "react";
import { useAsyncValue } from "react-router-dom";
import styles from "../cssModules/watchHistoryPage.module.css";
import { VideoOne } from "../../../components/videos/videoOne";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";
import { CardOne } from "../../../components/cards/cardOne";

export const WatchHistoryPage = () => {
      const loaderData = useAsyncValue();
      useEffect(() => {
            if (loaderData.status === "error") {
                  toast.error(loaderData.message, {
                        ...toastOptions,
                        autoClose: false,
                  });
            }
      }, [loaderData]);
      return (
            <main className={styles["main"]}>
                  <h2>Watch History</h2>
                  <CardOne>
                        {loaderData?.payload?.map((video, index) => {
                              return (
                                    <VideoOne
                                          video={video}
                                          deleteAction={`/watchHistory/${video._id}`}
                                          key={video._id}
                                    ></VideoOne>
                              );
                        })}
                  </CardOne>
            </main>
      );
};
