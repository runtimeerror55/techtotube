const mongoose = require("mongoose");
const videoSchema = mongoose.Schema({
      description: String,
      youtubeId: String,
      thumbnail: String,
      title: String,
      uploadedDate: String,
      category: String,
      channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "channels",
      },
});

const VideoModel = mongoose.model("videos", videoSchema);
module.exports = VideoModel;
