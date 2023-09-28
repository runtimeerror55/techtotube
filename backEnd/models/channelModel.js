const mongoose = require("mongoose");
const channelSchema = mongoose.Schema({
      name: String,
      profilePicture: String,
      subscribers: Number,
});

const ChannelModel = mongoose.model("channels", channelSchema);
module.exports = ChannelModel;
