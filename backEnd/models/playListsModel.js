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
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
      },
});

const PlayListsModel = mongoose.model("playLists", playListsSchema);
module.exports = PlayListsModel;
