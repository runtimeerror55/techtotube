const express = require("express");
const router = express.Router();
const VideoModel = require("../models/videoModel");

router.route("/").get(async (request, response) => {
      try {
            let queryString = request.query;
            console.log(queryString);
            if (queryString.category === "all") {
                  queryString = {};
            }
            const videos = await VideoModel.find(queryString).populate(
                  "channel"
            );
            if (videos.length === 0) {
                  response.status(500).json({
                        status: "error",
                        message: "could not find any videos",
                  });
            } else {
                  response
                        .status(200)
                        .json({ status: "success", payload: videos });
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

module.exports.homeRouter = router;
