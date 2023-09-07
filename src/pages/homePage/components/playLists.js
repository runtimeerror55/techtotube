import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import styles from "../cssModules/playLists.module.css";
import { Bars } from "react-loader-spinner";
import { PlayList } from "./playList";

export const PlayLists = (props) => {
      const playLists = props.playLists;

      const createPlayListFetcher = useFetcher();

      const createPlayListFetcherStatus =
            createPlayListFetcher.data &&
            createPlayListFetcher.state === "idle";

      useEffect(() => {
            if (createPlayListFetcherStatus) {
                  props.setPlayLists(createPlayListFetcher.data.payload);
            }
      }, [createPlayListFetcher]);

      return (
            <>
                  <section className={styles["play-lists-options"]}>
                        <h3 className={styles["play-lists-heading"]}>
                              PLAYSLISTS
                        </h3>

                        <createPlayListFetcher.Form
                              method="POST"
                              action="/playLists"
                              className={styles["create-new-playlist"]}
                        >
                              <input
                                    type="text"
                                    placeholder="type"
                                    className={styles["input-new-playlist"]}
                                    name="playList"
                              ></input>
                              <button
                                    type="submit"
                                    className={
                                          styles["create-new-playlist-button"]
                                    }
                              >
                                    create new
                              </button>
                        </createPlayListFetcher.Form>
                        <div className={styles["play-lists"]}>
                              {playLists.map((playList, index) => {
                                    return (
                                          <PlayList
                                                playList={playList}
                                                video={props.video}
                                                setPlayLists={
                                                      props.setPlayLists
                                                }
                                          ></PlayList>
                                    );
                              })}
                              <div className={styles["save-and-close-buttons"]}>
                                    <button
                                          type="button"
                                          className={
                                                styles[
                                                      "play-lists-close-button"
                                                ]
                                          }
                                    >
                                          close
                                    </button>
                              </div>
                        </div>
                  </section>
            </>
      );
};
