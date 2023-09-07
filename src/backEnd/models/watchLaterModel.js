const mongoose = require("mongoose");
const watchLaterSchema = mongoose.Schema({
      videos: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "videos",
            },
      ],
});

const watchLaterModel = mongoose.model("watchLater", watchLaterSchema);
module.exports = watchLaterModel;
