const mongoose = require("mongoose");
const watchHistorySchema = mongoose.Schema({
      videos: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "videos",
            },
      ],
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
      },
});

const watchHistoryModel = mongoose.model("watchHistory", watchHistorySchema);
module.exports = watchHistoryModel;
