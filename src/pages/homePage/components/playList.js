import { useFetcher } from "react-router-dom";
import styles from "../cssModules/playLists.module.css";
import { Bars } from "react-loader-spinner";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";
export const PlayList = ({ playList, video, setPlayLists }) => {
      const updatePlayListsFetcher = useFetcher();

      const updatePlayListsFetcherStatus =
            updatePlayListsFetcher.state === "idle" &&
            updatePlayListsFetcher.data;

      const [showUpdatePlayListLoader, setShowUpdatePlayListLoader] =
            useState(false);

      const isVideoPresentInPlayList = playList.videos.find((element) => {
            return element._id === video._id;
      });

      useEffect(() => {
            if (updatePlayListsFetcherStatus) {
                  const data = updatePlayListsFetcher.data;
                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);

                        setPlayLists(data.payload);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
                  setShowUpdatePlayListLoader(false);
            } else if (updatePlayListsFetcher.state !== "idle") {
                  setShowUpdatePlayListLoader(true);
            }
      }, [updatePlayListsFetcher]);

      return (
            <div className={styles["play-list"]}>
                  <label for="playlist">{playList.name}</label>
                  <div>
                        {showUpdatePlayListLoader ? (
                              <div
                                    style={{
                                          backgroundColor: "transparent",
                                          width: "60px",
                                          height: "40px",
                                    }}
                              >
                                    <Bars
                                          height="30"
                                          width="60"
                                          color="#4fa94d"
                                          ariaLabel="bars-loading"
                                          wrapperStyle={{}}
                                          wrapperClass=""
                                          visible={true}
                                    />
                              </div>
                        ) : isVideoPresentInPlayList ? (
                              <updatePlayListsFetcher.Form
                                    method="DELETE"
                                    action={`/playLists/${playList._id}/${video._id}`}
                              >
                                    <button
                                          type="submit"
                                          className={
                                                styles[
                                                      "remove-from-play-list-button"
                                                ]
                                          }
                                    >
                                          remove
                                    </button>
                              </updatePlayListsFetcher.Form>
                        ) : (
                              <updatePlayListsFetcher.Form
                                    method="PUT"
                                    action={`/playLists/${playList._id}/${video._id}`}
                              >
                                    <button
                                          type="submit"
                                          className={
                                                styles[
                                                      "add-to-play-list-button"
                                                ]
                                          }
                                    >
                                          add
                                    </button>
                              </updatePlayListsFetcher.Form>
                        )}
                  </div>
            </div>
      );
};
