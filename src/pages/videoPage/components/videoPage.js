import {
      useLoaderData,
      useFetcher,
      useAsyncError,
      useAsyncValue,
} from "react-router-dom";
import { useState } from "react";
import styles from "../cssModules/videoPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faMusic } from "@fortawesome/free-solid-svg-icons";
import { PlayListsOverlay } from "./playLists";
import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";

export const VideoPage = () => {
      const loaderData = useAsyncValue();
      const playingVideo = loaderData.payload.video.payload;
      const moreVideos = loaderData.payload.moreVideos.payload;
      const watchLaterVideos = loaderData.payload.watchLaterVideos.payload;

      const addToWatchLaterFetcher = useFetcher();
      const saveToPLayListFetcher = useFetcher();

      const [playListsData, setPlayListsData] = useState(false);
      const [showPlayListsOverlay, setShowPlayListsOverlay] = useState(false);

      const [showAddToWatchLaterLoader, setShowAddToWatchLaterLoader] =
            useState(false);

      const isVideoPresentInWatchLaterVideos = watchLaterVideos.some(
            (video) => {
                  return video._id === playingVideo._id;
            }
      );

      const addToWatchLaterFetcherStatus =
            addToWatchLaterFetcher.state === "idle" &&
            addToWatchLaterFetcher.data;

      useEffect(() => {
            if (
                  saveToPLayListFetcher.data &&
                  saveToPLayListFetcher.state === "idle"
            ) {
                  console.log(saveToPLayListFetcher.data);
                  setPlayListsData(
                        saveToPLayListFetcher.data.loaderData.payload.playLists
                  );
                  setShowPlayListsOverlay(true);
            }
      }, [saveToPLayListFetcher]);

      useEffect(() => {
            if (addToWatchLaterFetcherStatus) {
                  const data = addToWatchLaterFetcher.data;
                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
                  setShowAddToWatchLaterLoader(false);
            } else if (addToWatchLaterFetcher.state !== "idle") {
                  setShowAddToWatchLaterLoader(true);
            }
      }, [addToWatchLaterFetcher]);
      return (
            <>
                  <main className={styles["main"]}>
                        <section className={styles["video-section"]}>
                              <iframe
                                    className={styles["video-iframe"]}
                                    title="hello"
                                    src={`https://www.youtube.com/embed/${playingVideo.youtubeId}`}
                              ></iframe>
                              <h2>{playingVideo.title}</h2>
                              <div className={styles["video-info-and-options"]}>
                                    <div className={styles["channel-info"]}>
                                          <img
                                                className={
                                                      styles["channel-image"]
                                                }
                                                src={
                                                      playingVideo.channel
                                                            .profilePicture
                                                }
                                                alt="nothing"
                                          ></img>
                                          <div>
                                                <div
                                                      className={
                                                            styles[
                                                                  "channel-name"
                                                            ]
                                                      }
                                                >
                                                      {
                                                            playingVideo.channel
                                                                  .name
                                                      }
                                                </div>
                                                <div
                                                      className={
                                                            styles[
                                                                  "channel-subscribers"
                                                            ]
                                                      }
                                                >
                                                      {
                                                            playingVideo.channel
                                                                  .subscribers
                                                      }{" "}
                                                      m subscribers
                                                </div>
                                          </div>
                                    </div>
                                    <div className={styles["video-options"]}>
                                          <button
                                                className={
                                                      styles[
                                                            "video-like-button"
                                                      ]
                                                }
                                          >
                                                <FontAwesomeIcon
                                                      icon={faHeart}
                                                      className={
                                                            styles[
                                                                  "video-like-icon"
                                                            ]
                                                      }
                                                />
                                                Like
                                          </button>
                                          {showAddToWatchLaterLoader ? (
                                                <Bars
                                                      height="20"
                                                      width="130"
                                                      color="#4fa94d"
                                                      ariaLabel="bars-loading"
                                                      wrapperStyle={{}}
                                                      wrapperClass={
                                                            styles[
                                                                  "video-like-button"
                                                            ]
                                                      }
                                                      visible={true}
                                                />
                                          ) : isVideoPresentInWatchLaterVideos ? (
                                                <addToWatchLaterFetcher.Form
                                                      method="DELETE"
                                                      action={`/watchLater/${playingVideo._id}`}
                                                >
                                                      <button
                                                            className={
                                                                  styles[
                                                                        "video-like-button"
                                                                  ]
                                                            }
                                                      >
                                                            <FontAwesomeIcon
                                                                  icon={faClock}
                                                                  className={
                                                                        styles[
                                                                              "video-like-icon"
                                                                        ]
                                                                  }
                                                            />
                                                            remove from
                                                            watchLater
                                                      </button>
                                                </addToWatchLaterFetcher.Form>
                                          ) : (
                                                <addToWatchLaterFetcher.Form
                                                      method="PUT"
                                                      action={`/watchLater/${playingVideo._id}`}
                                                >
                                                      <button
                                                            className={
                                                                  styles[
                                                                        "video-like-button"
                                                                  ]
                                                            }
                                                      >
                                                            <FontAwesomeIcon
                                                                  icon={faClock}
                                                                  className={
                                                                        styles[
                                                                              "video-like-icon"
                                                                        ]
                                                                  }
                                                            />
                                                            save to watchLater
                                                      </button>
                                                </addToWatchLaterFetcher.Form>
                                          )}
                                          <saveToPLayListFetcher.Form action="/playlists">
                                                <button
                                                      className={
                                                            styles[
                                                                  "video-like-button"
                                                            ]
                                                      }
                                                >
                                                      <FontAwesomeIcon
                                                            icon={faMusic}
                                                            className={
                                                                  styles[
                                                                        "video-like-icon"
                                                                  ]
                                                            }
                                                      />
                                                      save to play list
                                                </button>
                                          </saveToPLayListFetcher.Form>
                                    </div>
                              </div>
                        </section>
                        <section className={styles["more-videos-section"]}>
                              <h3>More videos</h3>
                              {moreVideos.map((video) => {
                                    return (
                                          <>
                                                <div
                                                      className={
                                                            styles["video"]
                                                      }
                                                >
                                                      <img
                                                            src={
                                                                  video.thumbnail
                                                            }
                                                            alt="dave 2d"
                                                            className={
                                                                  styles[
                                                                        "video-thumbnail"
                                                                  ]
                                                            }
                                                      ></img>
                                                      <div
                                                            className={
                                                                  styles[
                                                                        "video-items"
                                                                  ]
                                                            }
                                                      >
                                                            <img
                                                                  className={
                                                                        styles[
                                                                              "channel-image"
                                                                        ]
                                                                  }
                                                                  src={
                                                                        video
                                                                              .channel
                                                                              .profilePicture
                                                                  }
                                                                  alt="a"
                                                            ></img>
                                                            <div>
                                                                  <div
                                                                        className={
                                                                              styles[
                                                                                    "video-title"
                                                                              ]
                                                                        }
                                                                  >
                                                                        {
                                                                              video.title
                                                                        }
                                                                  </div>
                                                                  <div
                                                                        className={
                                                                              styles[
                                                                                    "video-channel"
                                                                              ]
                                                                        }
                                                                  >
                                                                        {
                                                                              video
                                                                                    .channel
                                                                                    .name
                                                                                    .name
                                                                        }
                                                                  </div>
                                                                  <div
                                                                        className={
                                                                              styles[
                                                                                    "video-views"
                                                                              ]
                                                                        }
                                                                  >
                                                                        {
                                                                              video
                                                                                    .channel
                                                                                    .subscribers
                                                                        }
                                                                        m
                                                                        subscribers
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </>
                                    );
                              })}
                        </section>
                        {showPlayListsOverlay ? (
                              <PlayListsOverlay
                                    playListsData={playListsData}
                                    setPlayListsData={setPlayListsData}
                                    setShowPlayListsOverlay={
                                          setShowPlayListsOverlay
                                    }
                                    video={playingVideo}
                              ></PlayListsOverlay>
                        ) : (
                              ""
                        )}
                  </main>
            </>
      );
};
