import { defer } from "react-router-dom";
import { getToken } from "../utilities/utilities";
const backEndUrl = "https://techtotube-backend.vercel.app/";
export const homePageLoader = async ({ request }) => {
      return defer({
            loaderData: (async () => {
                  try {
                        let url = new URL(request.url);
                        let queryString = Array.from(url.searchParams).reduce(
                              (finalString, [key, value]) => {
                                    if (finalString === "?") {
                                          return (
                                                finalString + key + "=" + value
                                          );
                                    } else {
                                          return (
                                                finalString +
                                                "&" +
                                                key +
                                                "=" +
                                                value
                                          );
                                    }
                              },
                              "?"
                        );
                        console.log("homePageLoader", queryString);
                        const response = await fetch(
                              `https://techtotube-backend.vercel.app/${queryString}`
                        );
                        const data = await response.json();

                        return data;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const playListsLoader = async () => {
      return defer({
            loaderData: (async () => {
                  try {
                        console.log("loadersss");
                        const response = await fetch(
                              "https://techtotube-backend.vercel.app/playLists",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const data = await response.json();
                        return data;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const watchLaterPageLoader = async () => {
      console.log("watchLaterPageLoader");
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              "https://techtotube-backend.vercel.app/watchLater",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const videos = await response.json();

                        return videos;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const VideoPageLoader = async ({ request, params }) => {
      return defer({
            loaderData: (async () => {
                  try {
                        console.log("videoPageLoader");
                        let response = await fetch(
                              `https://techtotube-backend.vercel.app/videos/${params.videoId}`
                        );
                        const video = await response.json();

                        response = await fetch(
                              `https://techtotube-backend.vercel.app/`
                        );
                        const moreVideos = await response.json();

                        response = await fetch(
                              `https://techtotube-backend.vercel.app/watchLater`,
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const watchLaterVideos = await response.json();

                        console.log(video, moreVideos, watchLaterVideos);
                        return {
                              status: "success",
                              payload: { video, moreVideos, watchLaterVideos },
                        };
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};
