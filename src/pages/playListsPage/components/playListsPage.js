import { Form, useAsyncValue, useFetcher, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../cssModules/playListsPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faVideo,
      faCircleChevronDown,
      faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";
import { Bars, ColorRing } from "react-loader-spinner";
import { PVideo } from "./video";
import { PlayList } from "./playList";

export const PlayListsPage = () => {
      const loaderData = useAsyncValue();
      const navigate = useNavigate();
      const [showPlayListVideos, setShowPlayListVideos] = useState(null);
      const playListDropDownHandler = (event) => {
            event.stopPropagation();
            if (showPlayListVideos === event.currentTarget.id) {
                  setShowPlayListVideos(null);
            } else {
                  setShowPlayListVideos(event.currentTarget.id);
            }
      };
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
                  <h2 className={styles["playlists-heading"]}>PLAYLISTS</h2>
                  {loaderData?.payload?.map((playList) => {
                        return (
                              <PlayList
                                    key={playList._id}
                                    playList={playList}
                                    playListDropDownHandler={
                                          playListDropDownHandler
                                    }
                                    showPlayListVideos={showPlayListVideos}
                              ></PlayList>
                        );
                  })}
            </main>
      );
};
