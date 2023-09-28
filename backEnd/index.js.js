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

mongoose
      .connect("mongodb://127.0.0.1:27017/techtotube")
      .then(() => {
            console.log("connected to mongodb");
      })
      .catch((e) => {
            console.log(e);
      });
app.use(
      cors({
            origin: "*",
      })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authenticationRouter);
app.use("/", homeRouter);
app.use("/", watchLaterRouter);
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
