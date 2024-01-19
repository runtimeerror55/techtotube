const express = require("express");
const app = express();
const cors = require("cors");
const VideoModel = require("./models/videoModel");
const channelModel = require("./models/channelModel");
const mongoose = require("mongoose");

const { homeRouter } = require("./routes/home");
const { watchLaterRouter } = require("./routes/watchLater");
const { playListsRouter } = require("./routes/playLists");
const { authenticationRouter } = require("./routes/authentication");
const { watchHistoryRouter } = require("./routes/watchHistory");

console.log(process.env.db_url);

console.log(process.env);

mongoose
      .connect(
            "mongodb+srv://aakashdeep954:a1S6mNXvLK0b158x@portfoliocluster.c1qp6ud.mongodb.net/techtotube?retryWrites=true&w=majority"
      )
      .then(() => {
            console.log("connected to mongodb");
      })
      .catch((e) => {
            console.log(e);
      });

// app.use(
//       cors({
//             origin: "http://localhost:3000",
//       })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (request, response, next) => {
      //   console.log(request.method);
      if (request.method === "OPTIONS") {
            response.status(200).send("ok");
            return;
      }
      next();
});

app.use("/", authenticationRouter);
app.use("/", homeRouter);
app.use("/", watchLaterRouter);
app.use("/", watchHistoryRouter);
app.use("/", playListsRouter);

app.get("/videos/:videoId", async (request, response) => {
      try {
            const video = await VideoModel.findOne({
                  _id: request.params.videoId,
            }).populate("channel");
            response.status(200).json({ status: "success", payload: video });
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

app.listen("8080", () => {
      console.log("listening on port 8080");
});
