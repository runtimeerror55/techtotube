import { useAsyncValue } from "react-router-dom";
import styles from "../cssModules/videoPage.module.css";
import { Video } from "./video";
export const VideoPage = () => {
      const loaderData = useAsyncValue();
      console.log(loaderData);
      const playingVideo = loaderData.payload.video.payload;
      const moreVideos = loaderData.payload.moreVideos.payload;
      const watchLaterVideos = loaderData.payload.watchLaterVideos.payload;

      return (
            <>
                  <main className={styles["main"]}>
                        <section className={styles["video-section"]}>
                              <Video
                                    playingVideo={playingVideo}
                                    watchLaterVideos={watchLaterVideos}
                              ></Video>
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
                  </main>
            </>
      );
};
