const express = require("express");
const router = express.Router();
const PlayListsModel = require("../models/playListsModel");
const { isLoggedIn } = require("../middleware");

router.route("/playLists")
      .get(isLoggedIn, async (request, response) => {
            try {
                  const playLists = await PlayListsModel.findOne({
                        user: request.user._id,
                  }).populate({
                        path: "playLists",
                        populate: {
                              path: "videos",
                              populate: { path: "channel" },
                        },
                  });

                  if (!playLists) {
                        setTimeout(() => {
                              response.status(200).json({
                                    status: "success",
                                    payload: [],
                              });
                        }, 1000);
                  } else {
                        setTimeout(() => {
                              response.status(200).json({
                                    status: "success",
                                    message: "fetched successfully",
                                    payload: playLists.playLists,
                              });
                        }, 1000);
                  }
            } catch (error) {
                  setTimeout(() => {
                        response.status(500).json({
                              status: "error",
                              message: error.message,
                        });
                  }, 1000);
            }
      })
      .post(isLoggedIn, async (request, response) => {
            try {
                  const document = await PlayListsModel.findOne({
                        user: request.user._id,
                  });
                  if (!document) {
                        const newPlayList = new PlayListsModel({
                              playLists: [
                                    {
                                          name: request.body.playList,
                                    },
                              ],
                              user: request.user._id,
                        });

                        await newPlayList.save();
                        response.json({
                              status: "success",
                              message: "created play list",
                              payload: newPlayList.playLists,
                        });
                  } else {
                        document.playLists.push({
                              name: request.body.playList,
                        });
                        await document.save();
                        response.json({
                              status: "success",
                              message: "created play list",
                              payload: document.playLists,
                        });
                  }
            } catch (error) {
                  response.json({ status: "error", message: error.message });
            }
      });

router.route("/playLists/:playListId").delete(
      isLoggedIn,
      async (request, response) => {
            try {
                  const document = await PlayListsModel.findOne({
                        user: request.user._id,
                  });
                  const playListIndex = document.playLists.findIndex(
                        (playList) => {
                              return (
                                    playList._id.toString() ===
                                    request.params.playListId
                              );
                        }
                  );

                  document.playLists.splice(playListIndex, 1);
                  document.save();
                  setTimeout(() => {
                        response.status(200).json({
                              status: "success",
                              message: "deleted the play list",
                        });
                  }, 1000);
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      }
);

router.route("/playLists/:playListId/:videoId")
      .put(isLoggedIn, async (request, response) => {
            try {
                  const document = await PlayListsModel.findOne({
                        user: request.user._id,
                  }).populate({
                        path: "playLists",
                        populate: { path: "videos" },
                  });
                  const playList = document.playLists.find((playList) => {
                        return (
                              playList._id.toString() ===
                              request.params.playListId
                        );
                  });
                  const video = playList.videos.find((video) => {
                        console.log(video);
                        return video._id.toString() === request.params.videoId;
                  });
                  if (!video) {
                        playList.videos.push(request.params.videoId);
                        console.log(playList.videos);
                        await document.save();
                        setTimeout(() => {
                              response.json({
                                    status: "success",
                                    message: "added to play list",
                                    payload: document.playLists,
                              });
                        }, 1000);
                  } else {
                        response.json({
                              status: "error",
                              message: "already present in the play list",
                        });
                  }
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "errro", message: error.message });
            }
      })
      .delete(isLoggedIn, async (request, response) => {
            try {
                  const document = await PlayListsModel.findOne({
                        user: request.user._id,
                  }).populate({
                        path: "playLists",
                        populate: { path: "videos" },
                  });
                  const playList = document.playLists.find((playList) => {
                        return (
                              playList._id.toString() ===
                              request.params.playListId
                        );
                  });
                  const videoIndex = playList.videos.findIndex((video) => {
                        return video._id.toString() === request.params.videoId;
                  });
                  playList.videos.splice(videoIndex, 1);
                  await document.save();
                  setTimeout(() => {
                        response.status(200).json({
                              status: "success",
                              message: "removed from play list",
                              payload: document.playLists,
                        });
                  }, 1000);
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

module.exports.playListsRouter = router;
