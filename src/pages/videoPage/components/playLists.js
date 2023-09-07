import { useFetcher } from "react-router-dom";
import styles from "../cssModules/playLists.module.css";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const PlayListsOverlay = (props) => {
      const playListFetcher = useFetcher();
      const updatePlayListsFetcher = useFetcher();

      const playLists = props.playListsData;

      const updatePlayListsFetcherStatus =
            updatePlayListsFetcher.data &&
            updatePlayListsFetcher.state === "idle";

      const playListFetcherStatus =
            playListFetcher.data && playListFetcher.state === "idle";

      useEffect(() => {
            if (playListFetcherStatus) {
                  props.setPlayListsData(playListFetcher.data);
            }
      }, [playListFetcher]);

      useEffect(() => {
            if (updatePlayListsFetcherStatus) {
                  props.setPlayListsData(updatePlayListsFetcherStatus.data);
            }
      }, [updatePlayListsFetcher]);

      const PlayListsOverlayCloseButtonHandler = () => {
            console.log("settttttt");
            props.setShowPlayListsOverlay(false);
            props.setPlayListsData(false);
      };
      return (
            <>
                  <section className={styles["play-lists-overlay-section"]}>
                        <button
                              className={
                                    styles["play-lists-overlay-close-button"]
                              }
                              onClick={PlayListsOverlayCloseButtonHandler}
                        >
                              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                        </button>
                        <div className={styles["play-lists-overlay-options"]}>
                              <h3 className={styles["play-lists-heading"]}>
                                    PLAYSLISTS
                              </h3>

                              <playListFetcher.Form
                                    method="POST"
                                    action="/playLists"
                                    className={styles["create-new-playlist"]}
                              >
                                    <input
                                          type="text"
                                          placeholder="type"
                                          className={
                                                styles["input-new-playlist"]
                                          }
                                          name="playList"
                                    ></input>
                                    <button
                                          type="submit"
                                          className={
                                                styles[
                                                      "create-new-playlist-button"
                                                ]
                                          }
                                    >
                                          create new
                                    </button>
                              </playListFetcher.Form>
                              <div className={styles["play-lists"]}>
                                    {playLists.map((playList, index) => {
                                          const isVideoPresentInPlayList =
                                                playList.videos.find(
                                                      (video) => {
                                                            return (
                                                                  video._id ===
                                                                  props.video
                                                                        ._id
                                                            );
                                                      }
                                                );
                                          return (
                                                <div
                                                      className={
                                                            styles["play-list"]
                                                      }
                                                >
                                                      <div>
                                                            {index + 1}
                                                            {". "}
                                                            {playList.name}
                                                      </div>

                                                      <div>
                                                            {isVideoPresentInPlayList ? (
                                                                  <updatePlayListsFetcher.Form
                                                                        method="DELETE"
                                                                        action={`/playLists/${playList._id}/${props.video._id}`}
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
                                                                        action={`/playLists/${playList._id}/${props.video._id}`}
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
                                    })}
                              </div>
                        </div>
                  </section>
            </>
      );
};
