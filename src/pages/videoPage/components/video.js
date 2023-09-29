import { useFetcher } from "react-router-dom";
import { useContext, useState } from "react";
import styles from "../cssModules/video.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faMusic } from "@fortawesome/free-solid-svg-icons";
import { PlayLists } from "../../../components/playListsOverLay/playLists";
import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { toastOptions, colorRingOptions } from "../../../utilities/utilities";
import { ColorRing } from "react-loader-spinner";
import { authContext } from "../../../context/authentication";

export const Video = ({ playingVideo, watchLaterVideos }) => {
      const { token } = useContext(authContext);
      const addToWatchLaterFetcher = useFetcher();
      const saveToPLayListFetcher = useFetcher();
      const saveToPLayListFetcherStatus =
            saveToPLayListFetcher.data &&
            saveToPLayListFetcher.state === "idle";

      const [showLoader, setShowLoader] = useState(false);

      const [playListsData, setPlayListsData] = useState(false);
      const [showPlayListsOverlay, setShowPlayListsOverlay] = useState(false);

      const [showAddToWatchLaterLoader, setShowAddToWatchLaterLoader] =
            useState(false);

      let isVideoPresentInWatchLaterVideos = false;
      if (token) {
            isVideoPresentInWatchLaterVideos = watchLaterVideos.some(
                  (video) => {
                        return video._id === playingVideo._id;
                  }
            );
      }

      const addToWatchLaterFetcherStatus =
            addToWatchLaterFetcher.state === "idle" &&
            addToWatchLaterFetcher.data;

      useEffect(() => {
            if (saveToPLayListFetcherStatus) {
                  const data = saveToPLayListFetcher.data;
                  if (data.loaderData.status === "error") {
                        toast.error(data.loaderData.message, toastOptions);
                  } else {
                        toast.success(data.loaderData.message, toastOptions);
                        setPlayListsData(
                              saveToPLayListFetcher.data.loaderData.payload
                        );
                        setShowPlayListsOverlay(true);
                  }
                  setShowLoader(false);
            } else if (saveToPLayListFetcher.state !== "idle") {
                  setShowLoader(true);
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
                  <iframe
                        className={styles["video-iframe"]}
                        title="hello"
                        src={`https://www.youtube.com/embed/${playingVideo.youtubeId}`}
                  ></iframe>
                  <h3 className={styles["video-title"]}>
                        {playingVideo.title}
                  </h3>
                  <div className={styles["video-info-and-options"]}>
                        <div className={styles["channel-info"]}>
                              <img
                                    className={styles["channel-image"]}
                                    src={playingVideo.channel.profilePicture}
                                    alt="nothing"
                              ></img>
                              <div>
                                    <div className={styles["channel-name"]}>
                                          {playingVideo.channel.name}
                                    </div>
                                    <div
                                          className={
                                                styles["channel-subscribers"]
                                          }
                                    >
                                          {playingVideo.channel.subscribers}m
                                    </div>
                              </div>
                        </div>
                        <div className={styles["video-options"]}>
                              <button className={styles["video-like-button"]}>
                                    <FontAwesomeIcon
                                          icon={faHeart}
                                          className={styles["video-like-icon"]}
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
                                                styles["video-like-button"]
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
                                                remove from watchLater
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
                                                styles["video-like-button"]
                                          }
                                    >
                                          <FontAwesomeIcon
                                                icon={faMusic}
                                                className={
                                                      styles["video-like-icon"]
                                                }
                                          />
                                          save to play list
                                    </button>
                              </saveToPLayListFetcher.Form>
                        </div>
                  </div>
                  {showPlayListsOverlay ? (
                        <PlayLists
                              playLists={playListsData}
                              setPlayLists={setPlayListsData}
                              video={playingVideo}
                              setShowPlayListsOverlay={setShowPlayListsOverlay}
                        ></PlayLists>
                  ) : (
                        ""
                  )}
                  {showLoader ? (
                        <div className={styles["loader"]}>
                              <ColorRing {...colorRingOptions}></ColorRing>
                        </div>
                  ) : (
                        ""
                  )}
            </>
      );
};
