import { defer } from "react-router-dom";
import { getToken } from "../utilities/utilities";
let backEndUrl = "https://techtotube-backend.vercel.app/";
backEndUrl = "http://localhost:8080/";
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

                        const response = await fetch(
                              `${backEndUrl}${queryString}`
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
      console.log("playlists loader");
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(`${backEndUrl}playLists`, {
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        });
                        const data = await response.json();
                        console.log(data);
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
                              `${backEndUrl}watchLater`,
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

export const watchHistoryPageLoader = async () => {
      console.log("watchHistoryPageLoader");
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch(
                              `${backEndUrl}watchHistory`,
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
                              `${backEndUrl}videos/${params.videoId}`
                        );
                        const video = await response.json();

                        response = await fetch(`${backEndUrl}`);
                        const moreVideos = await response.json();

                        response = await fetch(`${backEndUrl}watchLater`, {
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        });
                        const watchLaterVideos = await response.json();

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
