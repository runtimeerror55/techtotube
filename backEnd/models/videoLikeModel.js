const mongoose = require("mongoose");
const videoLikeSchema = mongoose.Schema({
      videos: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "videos",
            },
      ],
});

const videoLikeModel = mongoose.model("videolike", videoLikeSchema);
module.exports = videoLikeModel;
