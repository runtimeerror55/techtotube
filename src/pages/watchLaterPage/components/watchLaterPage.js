import { useAsyncValue, useNavigate } from "react-router-dom";
import styles from "../cssModules/watchLaterPage.module.css";
import { VideoOne } from "../../../components/videos/videoOne";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";
import { CardOne } from "../../../components/cards/cardOne";

export const WatchLaterPage = () => {
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
                  <h2>Watch Later</h2>
                  <CardOne>
                        {loaderData?.payload?.map((video, index) => {
                              return (
                                    <VideoOne
                                          video={video}
                                          deleteAction={`/watchLater/${video._id}`}
                                          key={video._id}
                                    ></VideoOne>
                              );
                        })}
                  </CardOne>
            </main>
      );
};
