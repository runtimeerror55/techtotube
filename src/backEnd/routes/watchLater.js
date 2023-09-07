const express = require("express");
const router = express.Router();
const watchLaterModel = require("../models/watchLaterModel");

router.route("/watchLater").get(async (request, response) => {
      try {
            const watchLater = await watchLaterModel
                  .findOne({})
                  .populate({ path: "videos", populate: { path: "channel" } });

            response.status(200).json({
                  status: "success",
                  payload: watchLater.videos,
            });
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/watchLater/:videoId")
      .put(async (request, response) => {
            try {
                  const videoId = request.params.videoId;
                  const watchlater = await watchLaterModel.findOne();
                  if (!watchlater) {
                        const newWatchLater = new watchLaterModel({
                              videos: [videoId],
                        });
                        await newWatchLater.save();
                  } else {
                        watchlater.videos.push(videoId);
                        await watchlater.save();
                  }
                  setTimeout(() => {
                        response.status(200).json({
                              status: "success",
                              message: "added to watch later",
                        });
                  }, 1000);
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      })
      .delete(async (request, response) => {
            try {
                  const document = await watchLaterModel
                        .findOne({})
                        .populate("videos");
                  console.log(document);
                  const videoIndex = document.videos.findIndex((video) => {
                        return video._id.toString() === request.params.videoId;
                  });
                  document.videos.splice(videoIndex, 1);
                  await document.save();

                  setTimeout(() => {
                        response.status(200).json({
                              status: "success",
                              message: "deleted from watch later",
                        });
                  }, 1000);
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

module.exports.watchLaterRouter = router;
