import { useAsyncValue, Link, useFetcher } from "react-router-dom";
import styles from "../cssModules/videoPage.module.css";
import { Video } from "./video";
import { useEffect } from "react";
export const VideoPage = () => {
      const loaderData = useAsyncValue();
      console.log(loaderData);
      const playingVideo = loaderData.payload.video.payload;
      const moreVideos = loaderData.payload.moreVideos.payload;
      const watchLaterVideos = loaderData.payload.watchLaterVideos.payload;

      const watchHistoryFetcher = useFetcher();

      useEffect(() => {
            watchHistoryFetcher.submit(null, {
                  method: "PUT",
                  action: `/watchHistory/${playingVideo._id}`,
            });
      }, [playingVideo._id]);
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
                              <h2>More videos</h2>
                              <div className={styles["more-videos"]}>
                                    {moreVideos.map((video) => {
                                          return (
                                                <>
                                                      <div
                                                            className={
                                                                  styles[
                                                                        "video"
                                                                  ]
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
                                                                        <Link
                                                                              to={`/videos/${video._id}`}
                                                                              className={
                                                                                    styles[
                                                                                          "video-title"
                                                                                    ]
                                                                              }
                                                                        >
                                                                              {
                                                                                    video.title
                                                                              }
                                                                        </Link>
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
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </>
                                          );
                                    })}
                              </div>
                        </section>
                  </main>
            </>
      );
};
