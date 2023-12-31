import { Form, useAsyncValue, useFetcher } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../cssModules/playList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faVideo,
      faCircleChevronDown,
      faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";
import { Bars, ColorRing } from "react-loader-spinner";
import { VideoOne } from "../../../components/videos/videoOne";
import { colorRingOptions } from "../../../utilities/utilities";
import { CardOne } from "../../../components/cards/cardOne";

export const PlayList = ({
      playList,
      playListDropDownHandler,
      showPlayListVideos,
}) => {
      const [showDeletePlayListLoader, setShowDeletePlayListLoader] =
            useState(false);

      const deletePlayListFetcher = useFetcher();

      const deletePlayListFetcherStatus =
            deletePlayListFetcher.state === "loading" &&
            deletePlayListFetcher.data;

      useEffect(() => {
            if (deletePlayListFetcherStatus) {
                  const data = deletePlayListFetcher.data;
                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
                  setShowDeletePlayListLoader(false);
            } else if (deletePlayListFetcher.state !== "idle") {
                  setShowDeletePlayListLoader(true);
            }
      }, [deletePlayListFetcher]);
      return (
            <>
                  <div className={styles["play-list"]}>
                        <FontAwesomeIcon
                              icon={faVideo}
                              className={styles["play-list-logo"]}
                        />
                        <div className={styles["play-list-info"]}>
                              <h3 className={styles["play-list-name"]}>
                                    {playList.name}
                              </h3>
                              <span>{playList.videos.length} videos</span>
                        </div>

                        <button
                              className={styles["play-list-drop-down-button"]}
                              id={playList._id}
                              onClick={playListDropDownHandler}
                        >
                              <FontAwesomeIcon icon={faCircleChevronDown} />
                        </button>
                        <deletePlayListFetcher.Form
                              method="DELETE"
                              action={`/playLists/${playList._id}`}
                        >
                              {showDeletePlayListLoader ? (
                                    <button
                                          type="submit"
                                          disabled={true}
                                          className={
                                                styles[
                                                      "delete-play-list-button"
                                                ]
                                          }
                                    >
                                          <ColorRing
                                                {...colorRingOptions}
                                                height="20"
                                                width={20}
                                          />
                                          DELETING
                                    </button>
                              ) : (
                                    <button
                                          type="submit"
                                          className={
                                                styles[
                                                      "delete-play-list-button"
                                                ]
                                          }
                                    >
                                          <FontAwesomeIcon icon={faTrash} />
                                          DELETE
                                    </button>
                              )}
                        </deletePlayListFetcher.Form>
                  </div>
                  {showPlayListVideos === playList._id ? (
                        <CardOne>
                              {playList.videos.map((video, index) => {
                                    return (
                                          <VideoOne
                                                video={video}
                                                playList={playList}
                                                deleteAction={`/playLists/${playList._id}/${video._id}`}
                                          ></VideoOne>
                                    );
                              })}
                        </CardOne>
                  ) : (
                        ""
                  )}
            </>
      );
};
