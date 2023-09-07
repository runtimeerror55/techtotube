import { redirect } from "react-router-dom";

export const playListActions = async ({ request, params }) => {
      if (request.method === "POST") {
            const formData = await request.formData();

            const body = {
                  playList: formData.get("playList"),
            };
            const response = await fetch("http://localhost:8080/playLists", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
            });

            const data = response.json();
            return data;
      } else if (request.method === "DELETE") {
            const response = await fetch(
                  `http://localhost:8080/playLists/${params.playListId}`,
                  {
                        method: "DELETE",
                  }
            );

            return redirect("/playLists");
      }
};

export const playListVideoActions = async ({ request, params }) => {
      try {
            if (request.method === "PUT") {
                  const response = await fetch(
                        `http://localhost:8080/playLists/${params.playListId}/${params.videoId}`,
                        {
                              method: "PUT",
                        }
                  );

                  const data = await response.json();
                  return data;
            } else if (request.method === "DELETE") {
                  const response = await fetch(
                        `http://localhost:8080/playLists/${params.playListId}/${params.videoId}`,
                        {
                              method: "DELETE",
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
                        `http://localhost:8080/watchlater/${params.videoId}`,
                        {
                              method: "PUT",
                        }
                  );
                  const data = await response.json();
                  return data;
            } else if (request.method === "DELETE") {
                  const response = await fetch(
                        `http://localhost:8080/watchlater/${params.videoId}`,
                        {
                              method: "DELETE",
                        }
                  );
                  const data = await response.json();
                  return data;
            }
      } catch (error) {
            return { status: "error", message: error.message };
      }
};
