import { useState } from "react";
import { useFetcher, Link } from "react-router-dom";
import styles from "../cssModules/video.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { VideoOptions } from "./videoOptions";
import { PlayLists } from "../../../components/playListsOverLay/playLists";

export const Video = ({ video }) => {
      const [showVideoOptions, setShowVideoOptions] = useState(false);

      const videoOptiosOpenButtonHandler = () => {
            setShowVideoOptions(true);
      };
      const videoOptiosCloseButtonHandler = () => {
            setShowVideoOptions(false);
      };

      return (
            <div className={styles["video"]}>
                  <img
                        src={video.thumbnail}
                        alt="dave 2d"
                        className={styles["video-thumbnail"]}
                  ></img>
                  <div className={styles["video-items"]}>
                        <img
                              className={styles["channel-image"]}
                              src={video.channel.profilePicture}
                              alt="a"
                        ></img>
                        <div>
                              <Link
                                    to={`/videos/${video._id}`}
                                    className={styles["video-title"]}
                              >
                                    {video.title}
                              </Link>
                              <div className={styles["video-channel"]}>
                                    {video.channel.name}
                              </div>
                              <div className={styles["video-views"]}>
                                    {video.channel.subscribers}
                              </div>
                        </div>
                  </div>
                  <div
                        className={styles["video-options-open-button"]}
                        onClick={videoOptiosOpenButtonHandler}
                  >
                        <FontAwesomeIcon icon={faFutbol} />
                  </div>

                  {showVideoOptions ? (
                        <VideoOptions
                              video={video}
                              videoOptiosCloseButtonHandler={
                                    videoOptiosCloseButtonHandler
                              }
                              setShowVideoOptions={setShowVideoOptions}
                        ></VideoOptions>
                  ) : (
                        ""
                  )}
            </div>
      );
};
