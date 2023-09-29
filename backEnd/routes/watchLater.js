const express = require("express");
const router = express.Router();
const watchLaterModel = require("../models/watchLaterModel");
const { isLoggedIn } = require("../middleware");

router.route("/watchLater").get(isLoggedIn, async (request, response) => {
      try {
            const watchLater = await watchLaterModel
                  .findOne({ user: request.user._id })
                  .populate({ path: "videos", populate: { path: "channel" } });
            if (!watchLater) {
                  response.status(500).json({
                        status: "error",
                        message: "not found any videos",
                  });
            } else {
                  response.status(200).json({
                        status: "success",
                        payload: watchLater.videos,
                  });
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/watchLater/:videoId")
      .put(isLoggedIn, async (request, response) => {
            try {
                  const videoId = request.params.videoId;
                  const watchlater = await watchLaterModel.findOne({
                        user: request.user._id,
                  });
                  if (!watchlater) {
                        const newWatchLater = new watchLaterModel({
                              videos: [videoId],
                              user: request.user._id,
                        });
                        await newWatchLater.save();

                        response.status(200).json({
                              status: "success",
                              message: "added to watch later",
                        });
                  } else {
                        const video = watchlater.videos.find((video) => {
                              console.log(video);
                              return video._id.toString() === videoId;
                        });
                        if (video) {
                              response.status(500).json({
                                    status: "error",
                                    message: "video is already present in watch later",
                              });
                        } else {
                              watchlater.videos.push(videoId);
                              await watchlater.save();

                              response.status(200).json({
                                    status: "success",
                                    message: "added to watch later",
                              });
                        }
                  }
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      })
      .delete(isLoggedIn, async (request, response) => {
            try {
                  const document = await watchLaterModel
                        .findOne({ user: request.user._id })
                        .populate("videos");

                  const videoIndex = document.videos.findIndex((video) => {
                        return video._id.toString() === request.params.videoId;
                  });
                  document.videos.splice(videoIndex, 1);
                  await document.save();

                  response.status(200).json({
                        status: "success",
                        message: "deleted from watch later",
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

module.exports.watchLaterRouter = router;
