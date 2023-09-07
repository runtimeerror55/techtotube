const mongoose = require("mongoose");
const playListsSchema = mongoose.Schema({
      playLists: [
            {
                  name: String,
                  videos: [
                        {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: "videos",
                        },
                  ],
            },
      ],
});

const PlayListsModel = mongoose.model("playLists", playListsSchema);
module.exports = PlayListsModel;
