import { redirect } from "react-router-dom";
import { getToken } from "../utilities/utilities";

export const playListActions = async ({ request, params }) => {
      try {
            if (request.method === "POST") {
                  const formData = await request.formData();

                  const body = {
                        playList: formData.get("playList"),
                  };
                  const response = await fetch(
                        "https://techtotube-backend.vercel.app/playLists",
                        {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                                    authorization: "Bearer " + getToken(),
                              },
                              body: JSON.stringify(body),
                        }
                  );

                  const data = response.json();
                  return data;
            } else if (request.method === "DELETE") {
                  const response = await fetch(
                        `https://techtotube-backend.vercel.app/playLists/${params.playListId}`,
                        {
                              method: "DELETE",
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        }
                  );

                  return redirect("/playLists");
            }
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const playListVideoActions = async ({ request, params }) => {
      try {
            if (request.method === "PUT") {
                  const response = await fetch(
                        `https://techtotube-backend.vercel.app/playLists/${params.playListId}/${params.videoId}`,
                        {
                              method: "PUT",
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        }
                  );

                  const data = await response.json();
                  return data;
            } else if (request.method === "DELETE") {
                  const response = await fetch(
                        `https://techtotube-backend.vercel.app/playLists/${params.playListId}/${params.videoId}`,
                        {
                              method: "DELETE",
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        }
                  );
                  const data = await response.json();
                  return data;
            }
      } catch (error) {
            return { status: "errro", message: error.message };
      }
};

export const addToWatchLater = async ({ request, params }) => {
      try {
            if (request.method === "PUT") {
                  console.log(params.videoId);

                  const response = await fetch(
                        `https://techtotube-backend.vercel.app/watchlater/${params.videoId}`,
                        {
                              method: "PUT",
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        }
                  );
                  const data = await response.json();
                  return data;
            } else if (request.method === "DELETE") {
                  const response = await fetch(
                        `https://techtotube-backend.vercel.app/watchlater/${params.videoId}`,
                        {
                              method: "DELETE",
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        }
                  );
                  const data = await response.json();
                  return data;
            }
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const registerAction = async ({ request, params }) => {
      try {
            const formData = await request.formData();
            const body = Object.fromEntries(formData);
            const response = await fetch(
                  "https://techtotube-backend.vercel.app/register",
                  {
                        headers: {
                              "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(body),
                  }
            );
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const loginAction = async ({ request, params }) => {
      try {
            const formData = await request.formData();
            const body = Object.fromEntries(formData);
            const response = await fetch(
                  "https://techtotube-backend.vercel.app/login",
                  {
                        headers: {
                              "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(body),
                  }
            );

            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};
