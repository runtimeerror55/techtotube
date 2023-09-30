const express = require("express");
const router = express.Router();
const watchHistoryModel = require("../models/watchHistoryModel");
const { isLoggedIn } = require("../middleware");

router.route("/watchHistory").get(isLoggedIn, async (request, response) => {
      try {
            const watchHistory = await watchHistoryModel
                  .findOne({ user: request.user._id })
                  .populate({ path: "videos", populate: { path: "channel" } });

            if (!watchHistory) {
                  response.status(200).json({
                        status: "success",
                        payload: [],
                  });
            } else {
                  response.status(200).json({
                        status: "success",
                        payload: watchHistory.videos,
                  });
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/watchHistory/:videoId")
      .put(isLoggedIn, async (request, response) => {
            try {
                  const videoId = request.params.videoId;
                  const watchHistory = await watchHistoryModel.findOne({
                        user: request.user._id,
                  });
                  if (!watchHistory) {
                        const newWatchHistory = new watchHistoryModel({
                              videos: [videoId],
                              user: request.user._id,
                        });
                        await newWatchHistory.save();

                        response.status(200).json({
                              status: "success",
                              message: "added to watch later",
                        });
                  } else {
                        const video = watchHistory.videos.find((video) => {
                              console.log(video);
                              return video._id.toString() === videoId;
                        });
                        if (video) {
                              response.status(500).json({
                                    status: "error",
                                    message: "video is already present in watch later",
                              });
                        } else {
                              watchHistory.videos.push(videoId);
                              await watchHistory.save();

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
                  const document = await watchHistoryModel
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

module.exports.watchHistoryRouter = router;
