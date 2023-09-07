import { useFetcher } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../cssModules/playListsPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { colorRingOptions, toastOptions } from "../../../utilities/utilities";
import { Bars, ColorRing } from "react-loader-spinner";

export const PVideo = ({ video, deleteAction }) => {
      const deleteVideofromPlayListFetcher = useFetcher();
      const deleteVideofromPlayListFetcherStatus =
            deleteVideofromPlayListFetcher.state === "idle" &&
            deleteVideofromPlayListFetcher.data;

      const [
            showDeleteVideofromPlayListLoader,
            setShowDeleteVideoFromPlyaListLoader,
      ] = useState(false);

      useEffect(() => {
            console.log(deleteVideofromPlayListFetcher.data);
            if (deleteVideofromPlayListFetcherStatus) {
                  const data = deleteVideofromPlayListFetcher.data;

                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);
                  } else {
                        toast.error(data.message, toastOptions);
                  }
                  setShowDeleteVideoFromPlyaListLoader(false);
            } else if (deleteVideofromPlayListFetcher.state !== "idle") {
                  setShowDeleteVideoFromPlyaListLoader(true);
            }
      }, [deleteVideofromPlayListFetcher]);

      return (
            <div key={video._id} className={styles["video"]}>
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
                              <div className={styles["video-title"]}>
                                    {video.title}
                              </div>
                              <div className={styles["video-channel"]}>
                                    {video.channel.name}
                              </div>
                              <div className={styles["video-views"]}>
                                    {video.channel.subscribers}
                              </div>
                        </div>
                  </div>
                  {showDeleteVideofromPlayListLoader ? (
                        <button
                              className={
                                    styles["delete-video-from-play-list-button"]
                              }
                        >
                              <ColorRing
                                    {...colorRingOptions}
                                    height="25"
                                    width={30}
                              />
                              DELETING
                        </button>
                  ) : (
                        <deleteVideofromPlayListFetcher.Form
                              method="DELETE"
                              action={deleteAction}
                        >
                              <button
                                    className={
                                          styles[
                                                "delete-video-from-play-list-button"
                                          ]
                                    }
                              >
                                    <FontAwesomeIcon icon={faTrash} />
                                    DELETE
                              </button>
                        </deleteVideofromPlayListFetcher.Form>
                  )}
            </div>
      );
};
