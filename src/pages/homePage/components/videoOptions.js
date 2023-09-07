import { useFetcher, useSearchParams } from "react-router-dom";
import styles from "../cssModules/videoOptions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faCirclePlay,
      faFutbol,
      faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { colorRingOptions, toastOptions } from "../../../utilities/utilities";

export const VideoOptions = (props) => {
      const saveToPLayListFetcher = useFetcher();
      const addToWatchLaterFetcher = useFetcher();

      const [showLoader, setShowLoader] = useState(false);

      const saveToPLayListFetcherStatus =
            saveToPLayListFetcher.data &&
            saveToPLayListFetcher.state === "idle";

      const addToWatchLaterFetcherStatus =
            addToWatchLaterFetcher.data &&
            addToWatchLaterFetcher.state === "idle";

      useEffect(() => {
            if (addToWatchLaterFetcherStatus) {
                  const data = addToWatchLaterFetcher.data;
                  console.log(data);
                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
                  setShowLoader(false);
            } else if (addToWatchLaterFetcher.state !== "idle") {
                  setShowLoader(true);
            }
      }, [addToWatchLaterFetcher]);

      useEffect(() => {
            if (saveToPLayListFetcherStatus) {
                  const data = saveToPLayListFetcher.data;
                  if (data.loaderData.status === "error") {
                        console.log("error");
                        toast.error(data.loaderData.message, toastOptions);
                  } else {
                        toast.success(data.loaderData.message, toastOptions);
                        props.setPlayLists(
                              saveToPLayListFetcher.data.loaderData.payload
                                    .playLists
                        );
                        props.setShowVideoOptions(false);
                  }

                  setShowLoader(false);
            } else if (saveToPLayListFetcher.state !== "idle") {
                  setShowLoader(true);
            }
      }, [saveToPLayListFetcher]);

      if (showLoader) {
            return (
                  <div className={styles["video-options"]}>
                        <div className={styles["loader"]}>
                              <ColorRing {...colorRingOptions}></ColorRing>
                        </div>
                  </div>
            );
      }
      return (
            <div className={styles["video-options"]}>
                  <saveToPLayListFetcher.Form action="/playlists">
                        <button
                              type="submit"
                              className={styles["video-option"]}
                        >
                              <FontAwesomeIcon
                                    className={styles["video-option-icon"]}
                                    icon={faCirclePlay}
                              />
                              <span>save to play list</span>
                        </button>
                  </saveToPLayListFetcher.Form>

                  <addToWatchLaterFetcher.Form
                        method="PUT"
                        action={`/watchLater/${props.video._id}`}
                  >
                        <button
                              type="submit"
                              className={styles["video-option"]}
                        >
                              <FontAwesomeIcon
                                    className={styles["video-option-icon"]}
                                    icon={faFutbol}
                              />
                              save to watch later
                        </button>
                  </addToWatchLaterFetcher.Form>

                  <div className={styles["video-options-close-button"]}>
                        {" "}
                        <FontAwesomeIcon
                              className={
                                    styles["video-options-close-button-icon"]
                              }
                              icon={faXmark}
                              onClick={props.videoOptiosCloseButtonHandler}
                        />
                  </div>
            </div>
      );
};
